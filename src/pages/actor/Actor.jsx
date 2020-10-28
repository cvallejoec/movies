import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './actor.css';

import Global from '../../Global';
import ActorCard from '../../components/actorCard/ActorCard';

const Actor = () => {
  const [actors, setActors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(Global.url + '/api/actor')
      .then((res) => {
        setLoading(false);
        setActors(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Actors</h2>
      {loading ? (
        <h2>Loading...</h2>
      ) : !actors.length ? (
        <h2>Aún no tienes actores registrados</h2>
      ) : (
        actors.map((actor) => (
          <ActorCard
            key={actor.actor_id}
            actorName={actor.actor_name}
            actorAge={actor.actor_age}
            actorImg={actor.actor_img}
          />
        ))
      )}
    </div>
  );
};

export default Actor;
