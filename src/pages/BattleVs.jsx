import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../services/AuthProvider"; // Adjust the path if necessary
import Navbar from "../components/Navbar";
import { createFight } from "../utils/fightLogic"; // Import fight logic
import "../styles/BattleVs.css";

const BattleVs = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [enemyTeam, setEnemyTeam] = useState(null);
  const [fightResult, setFightResult] = useState(null);
  const [fight, setFight] = useState(null);
  const { currentUser } = useAuth();

  // Fetch the selected team from Firestore
  useEffect(() => {
    const fetchTeam = async () => {
      const teamDocRef = doc(db, "shared_teams", teamId);
      const teamDoc = await getDoc(teamDocRef);

      if (teamDoc.exists()) {
        setTeam({ id: teamDoc.id, ...teamDoc.data() });
      } else {
        console.log("No such document!");
      }
    };

    fetchTeam();
  }, [teamId]);

  // Fetch the enemy team (current user's team) from Firestore
  useEffect(() => {
    const fetchEnemyTeam = async () => {
      if (currentUser) {
        const userCollection = collection(
          db,
          `users/${currentUser.uid}/collection`
        );
        const userCollectionSnapshot = await getDocs(userCollection);
        const members = userCollectionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEnemyTeam({ name: "Your Team", members });
      }
    };

    fetchEnemyTeam();
  }, [currentUser]);

  const handleStartFight = () => {
    if (team && enemyTeam) {
      const nextTurn = createFight(team, enemyTeam);
      setFight(() => nextTurn); // Set the fight function
      handleNextTurn(nextTurn); // Start the first turn
    }
  };

  const handleNextTurn = (nextTurn) => {
    const result = nextTurn();
    setFightResult(result);
    updateTeams(result.team1, result.team2);
    if (result && result.turnResult) {
      setTimeout(() => resetTurnMessages(result), 3000); // Reset messages after 3 seconds
    }
    if (result && result.winner) {
      setFight(null); // End the fight
      setTimeout(() => resetFightMessages(result), 3000); // Reset messages after 3 seconds
    }
  };

  const updateTeams = (team1Members, team2Members) => {
    if (Array.isArray(team1Members) && Array.isArray(team2Members)) {
      setTeam((prevTeam) => ({
        ...prevTeam,
        members: team1Members.map((member) => ({ ...member })),
      }));
      setEnemyTeam((prevTeam) => ({
        ...prevTeam,
        members: team2Members.map((member) => ({ ...member })),
      }));
    }
  };

  const resetTurnMessages = (result) => {
    setFightResult({ ...result, turnResult: "" });
  };

  const resetFightMessages = (result) => {
    setFightResult({
      winner: result.winner,
      loser: result.loser,
      messages: [],
    });
  };

  if (!team || !enemyTeam) {
    return <p>Loading...</p>;
  }

  return (
    <div className="battle-vs">
      <Navbar />
      <div className="battle-vs-content">
        <div className="team-container">
          <h1>Team: {team.name}</h1>
          <p>Created by: {team.createdBy}</p>
          <div className="team-members">
            {team.members.map((hero) => (
              <div key={hero.id} className="team-member">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="team-member-image"
                />
                <div className="team-member-details">
                  <h3>
                    {hero.name} ({hero.nickname})
                  </h3>
                  <p>Ability: {hero.ability}</p>
                  <p>Health: {hero.health}</p>
                  <p>Power: {hero.power}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="empty-container">
          {fightResult && (
            <div className="fight-result-container">
              <div className="fight-result">
                {fightResult.winner ? (
                  <p className="special-message">
                    The winner is: {fightResult.winner.name}
                  </p>
                ) : (
                  <p className="special-message">It's a tie!</p>
                )}
                <div className="fight-messages">
                  {fightResult.turnResult && <p>{fightResult.turnResult}</p>}
                  {fightResult.messages.map((message, index) => (
                    <p
                      key={index}
                      className={
                        message.includes("fallen")
                          ? "special-message"
                          : "fight-messages"
                      }
                    >
                      {message}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="team-container">
          <h1>Enemy Team: {enemyTeam.name}</h1>
          <div className="team-members">
            {enemyTeam.members.map((hero) => (
              <div key={hero.id} className="team-member">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="team-member-image"
                />
                <div className="team-member-details">
                  <h3>
                    {hero.name} ({hero.nickname})
                  </h3>
                  <p>Ability: {hero.ability}</p>
                  <p>Health: {hero.health}</p>
                  <p>Power: {hero.power}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {fight ? (
        <button onClick={() => handleNextTurn(fight)} className="fight-button">
          Next Turn
        </button>
      ) : (
        <button onClick={handleStartFight} className="fight-button">
          Start Fight
        </button>
      )}
    </div>
  );
};

export default BattleVs;
