import React, { useState } from 'react';
import './actorCard.css';

import Modal from '../modal/Modal.jsx';
import CreateActor from '../createActor/CreateActor.jsx';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ActorCard = ({ loadData, actorId, actorName, actorAge, actorImg }) => {
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);

  const toggleModal = () => {
    localStorage.setItem('actorId', actorId);
    setIsVisibleEdit(!isVisibleEdit);
  };

  return (
    <div
      className="actor-card"
      style={{ backgroundImage: `url(${actorImg})` }}
      id="actor-card"
    >
      {isVisibleEdit && (
        <Modal isVisible={isVisibleEdit} setIsVisible={setIsVisibleEdit}>
          <CreateActor setIsVisible={setIsVisibleEdit} loadData={loadData} />
        </Modal>
      )}
      {/* <div className="actor-card__icon"> */}
      <IconButton onClick={() => toggleModal()} className="actor-card__icon">
        <MoreVertIcon style={{ fill: 'var(--lightGray)', fontSize: 40 }} />
      </IconButton>
      {/* </div> */}
      <div className="actor-card__body">
        <h2 className="actor-card__name">{actorName}</h2>
        <p className="actor-car__age">{actorAge} años</p>
      </div>
    </div>
  );
};

export default ActorCard;
