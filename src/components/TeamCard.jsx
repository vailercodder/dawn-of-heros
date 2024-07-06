import React from "react";
import "../styles/TeamCard.css";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ team, onDelete }) => {
  const navigate = useNavigate();

  const handleFight = () => {
    navigate(`/battle/vs/${team.id}`);
  };

  return (
    <div className="team-card">
      <h2 className="team-card-name">{team.name}</h2>
      <p>Created by: {team.createdBy}</p>
      <div className="team-members">
        {team.members && team.members.length > 0 ? (
          team.members.map((hero) =>
            hero && hero.image && hero.name && hero.nickname ? (
              <div key={hero.id} className="team-member">
                <img
                  src={hero.image}
                  alt={`${hero.name}`}
                  className="team-card-image"
                />
                <div className="team-card-details">
                  <h3 className="team-card-name">
                    {hero.name} ({hero.nickname})
                  </h3>
                </div>
              </div>
            ) : null
          )
        ) : (
          <p>No members in this team.</p>
        )}
      </div>
      <button className="delete-button" onClick={() => onDelete(team.id)}>
        Delete Team
      </button>
      <button className="fight-button" onClick={handleFight}>
        Fight
      </button>
    </div>
  );
};

export default TeamCard;
