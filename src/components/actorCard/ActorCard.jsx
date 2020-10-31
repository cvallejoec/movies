import React from 'react';
import './actorCard.css';

const ActorCard = ({ actorName, actorAge, actorImg }) => {
  return (
    <div className="actor-card" style={{ backgroundImage: `url(${actorImg})` }}>
      <div className="actor-card__body">
        <h2 className="actor-card__name">{actorName}</h2>
        <p className="actor-car__age">{actorAge} años</p>
      </div>
    </div>
  );
};

export default ActorCard;
