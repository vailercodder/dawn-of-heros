import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../services/AuthProvider"; // Adjust the path if necessary
import Navbar from "../components/Navbar";
import TeamCard from "../components/TeamCard"; // Import TeamCard component
import { fetchAllTeams, createTeam, deleteTeam } from "../services/teamService"; // Import service functions
import "../styles/Battle.css";

const Battle = () => {
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [createdTeam, setCreatedTeam] = useState(null);
  const [allTeams, setAllTeams] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const fetchUserCollection = async () => {
        const userCollection = collection(
          db,
          `users/${currentUser.uid}/collection`
        );
        const userCollectionSnapshot = await getDocs(userCollection);
        const members = userCollectionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeamMembers(members);
      };

      fetchUserCollection();
    }
  }, [currentUser]);

  useEffect(() => {
    const getAllTeams = async () => {
      const teamsList = await fetchAllTeams();
      setAllTeams(teamsList);
    };

    getAllTeams();
  }, []);

  const handleCreateTeam = async () => {
    if (!currentUser) {
      console.error("No user is signed in.");
      return;
    }

    try {
      const newTeam = await createTeam(teamName, teamMembers, currentUser);
      setCreatedTeam(newTeam);
      const teamsList = await fetchAllTeams();
      setAllTeams(teamsList);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      const teamToDelete = allTeams.find((team) => team.id === teamId);
      if (teamToDelete.createdBy !== currentUser.email) {
        alert("You are not authorized to delete this team.");
        return;
      }
      await deleteTeam(teamId);
      setAllTeams(allTeams.filter((team) => team.id !== teamId));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <div className="battle-page">
      <Navbar />
      <div className="battle-content">
        <h1>Welcome to the Battle Arena</h1>
        <p>Select your heroes and start the battle!</p>
        <div className="create-team-button">
          <input
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <button className="btn-create-team" onClick={handleCreateTeam}>
            Create Team
          </button>
        </div>
        {createdTeam && (
          <div className="battle-teams">
            <div className="team-container">
              <TeamCard team={createdTeam} onDelete={handleDeleteTeam} />
            </div>
          </div>
        )}
        <div className="all-teams">
          <h2>All Teams</h2>
          {allTeams.map((team) => (
            <div key={team.id} className="team-container">
              <TeamCard team={team} onDelete={handleDeleteTeam} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Battle;
