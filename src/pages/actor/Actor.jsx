import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './actor.css';

import Global from '../../Global';
import ActorCard from '../../components/actorCard/ActorCard';
import Modal from '../../components/modal/Modal.jsx';
import CreateActor from '../../components/createActor/CreateActor.jsx';

const Actor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [actors, setActors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
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
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="global__wrapper">
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        <CreateActor setIsVisible={setIsVisible} loadData={loadData} />
      </Modal>
      <div className="global__center--vertical movie__header">
        <h2 className="global__title">Actores</h2>
        <button className="global__button" onClick={toggleModal}>
          Crear Actor
        </button>
      </div>
      <div className="global__grid">
        {loading ? (
          <h2>Loading...</h2>
        ) : !actors.length ? (
          <h2>Aún no tienes actores registrados</h2>
        ) : (
          actors.map((actor) => (
            <ActorCard
              key={actor.actor_id}
              actorId={actor.actor_id}
              actorName={actor.actor_name}
              actorAge={actor.actor_age}
              actorImg={actor.actor_img}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Actor;
