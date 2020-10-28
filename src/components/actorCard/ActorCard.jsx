import React from 'react';

const ActorCard = ({ actorName, actorAge, actorImg }) => {
  return (
    <div>
      <h2>{actorName}</h2>
      <p>{actorAge}</p>
      <img src={actorImg} alt="image" width="100" />
    </div>
  );
};

export default ActorCard;
