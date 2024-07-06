import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../services/AuthProvider";
import Navbar from "../components/Navbar";
import "../styles/HeroStats.css";

const HeroStats = () => {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const heroDocRef = doc(db, "heros", id);
        const heroDoc = await getDoc(heroDocRef);

        if (heroDoc.exists()) {
          console.log("Hero data:", heroDoc.data());
          setHero({ id: heroDoc.id, ...heroDoc.data() });
          setNickname(heroDoc.data().nickname || "");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [id]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNicknameSubmit = async () => {
    if (!currentUser) {
      console.error("No user is signed in.");
      return;
    }

    try {
      const userHeroDocRef = doc(db, `users/${currentUser.uid}/collection`, id);
      await updateDoc(userHeroDocRef, { nickname });
      console.log("Nickname updated successfully!");
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!hero) {
    return <p>No hero found.</p>;
  }

  return (
    <div className="hero-stats">
      <Navbar />
      <div className="hero-stats-content">
        <h1>
          {hero.name} ({hero.nickname})
        </h1>
        <img src={hero.image} alt={`${hero.name}`} />
        <p>
          <strong>Ability:</strong> {hero.ability}
        </p>
        <p>
          <strong>Ability ID:</strong> {hero["ability-id"]}
        </p>
        <p>
          <strong>Health:</strong> {hero.health}
        </p>
        <p>
          <strong>Power:</strong> {hero.power}
        </p>
        <div className="nickname-update">
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="Enter new nickname"
          />
          <button onClick={handleNicknameSubmit}>Update Nickname</button>
        </div>
      </div>
    </div>
  );
};

export default HeroStats;
