import React from 'react';
import './modal.css';

import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Modal = ({ children, isVisible, setIsVisible }) => {
  const modal = 'global__center modal';
  const container = 'modal__container';

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={isVisible ? modal + ' active' : modal}
      id="modal"
      onClick={(e) => (e.target.id === 'modal' ? toggleModal() : null)}
    >
      <div
        className={
          isVisible
            ? container + ' modal__container--open'
            : container + ' modal__container--closed'
        }
      >
        {/* <h2>Modal</h2>
        <p>Estás apunto de crear una ventana muy chévere</p>
        <p>Te gustó</p> */}
        {children}
        <div className="modal__buttons" onClick={toggleModal}>
          <IconButton>
            <HighlightOffIcon style={{ fill: 'var(--text)', fontSize: 40 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
