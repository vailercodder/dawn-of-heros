import React from "react";
import { Link } from "react-router-dom";
import "../styles/HeroCard.css";

const HeroCard = ({ hero }) => {
  return (
    <Link to={`/hero-stats/${hero.id}`} className="hero-card-link">
      <div className="hero-card">
        <img src={hero.image} alt={`${hero.name}`} className="hero-image" />
        <div className="hero-details">
          <h2 className="hero-name">
            {hero.name} ({hero.nickname})
          </h2>
          <p className="hero-ability">Ability: {hero.ability}</p>
          <p className="hero-ability-id">Ability ID: {hero["ability-id"]}</p>
          <p className="hero-health">Health: {hero.health}</p>
          <p className="hero-power">Power: {hero.power}</p>
        </div>
      </div>
    </Link>
  );
};

export default HeroCard;
