import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroCard from "../components/HeroCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/HeroGallery.css";

const HeroGallery = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      const heroCollection = collection(db, "heros");
      const heroSnapshot = await getDocs(heroCollection);
      const heroList = heroSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHeroes(heroList);
    };

    fetchHeroes();
  }, []);

  return (
    <div className="hero-gallery">
      <Navbar />
      <div className="hero-gallery-content">
        <h1>Hero Gallery</h1>
        <p>Here you can see all the heroes...</p>
      </div>
      <div className="hero-list-container">
        {heroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  );
};

export default HeroGallery;
