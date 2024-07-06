import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroCard from "../components/HeroCard";
import { db } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../services/AuthProvider";
import "../styles/HeroGallery.css";

const MyCollection = () => {
  const [heroes, setHeroes] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const fetchUserHeroes = async () => {
        const userHeroCollection = collection(
          db,
          `users/${currentUser.uid}/collection`
        );
        const userHeroSnapshot = await getDocs(userHeroCollection);
        const userHeroList = userHeroSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHeroes(userHeroList);
      };

      fetchUserHeroes();
    }
  }, [currentUser]);

  const addRandomHeroesToUserCollection = async () => {
    if (!currentUser) {
      console.error("No user is signed in.");
      return;
    }

    const userCollectionRef = collection(
      db,
      `users/${currentUser.uid}/collection`
    );
    const userHeroSnapshot = await getDocs(userCollectionRef);

    if (userHeroSnapshot.size >= 3) {
      console.log("User's collection already has 3 or more heroes.");
      return;
    }

    const heroCollection = collection(db, "heros");
    const heroSnapshot = await getDocs(heroCollection);
    const allHeroes = heroSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get three random heroes
    const randomHeroes = allHeroes.sort(() => 0.5 - Math.random()).slice(0, 3);

    for (const hero of randomHeroes) {
      console.log(`Adding hero with ID: ${hero.id}`);
      const heroDocRef = doc(userCollectionRef, hero.id.toString());
      await setDoc(heroDocRef, hero);
    }

    console.log("Added heroes to user's collection:", randomHeroes);
    setHeroes([...heroes, ...randomHeroes]);
  };

  return (
    <div className="hero-gallery">
      <Navbar />
      <div className="hero-gallery-content">
        <h1>Welcome to My Collection</h1>
        <p>Here is my collection of heroes</p>
        <button
          className="add-hero-btn"
          onClick={addRandomHeroesToUserCollection}
        >
          Add Random Heroes to My Collection
        </button>
      </div>
      <div className="hero-list-container">
        {heroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  );
};

export default MyCollection;
