import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// Fetch all teams from the shared_teams collection
export const fetchAllTeams = async () => {
  const teamsCollection = collection(db, "shared_teams");
  const teamsSnapshot = await getDocs(teamsCollection);
  const teamsList = teamsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return teamsList;
};

// Create a new team in the shared_teams collection
export const createTeam = async (teamName, teamMembers, currentUser) => {
  const validMembers = teamMembers.filter(
    (hero) => hero && hero.image && hero.name && hero.nickname
  );
  const docRef = await addDoc(collection(db, "shared_teams"), {
    name: teamName,
    members: validMembers,
    createdBy: currentUser.email,
    createdAt: Timestamp.now(),
  });
  const newTeam = {
    name: teamName,
    members: validMembers,
    createdBy: currentUser.email,
    createdAt: Timestamp.now(),
  };
  return { id: docRef.id, ...newTeam };
};

// Delete a team from the shared_teams collection
export const deleteTeam = async (teamId) => {
  await deleteDoc(doc(db, "shared_teams", teamId));
};
