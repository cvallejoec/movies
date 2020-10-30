import React, { useState } from 'react';
import './movieCard.css';

import CreateMovie from '../createMovie/CreateMovie.jsx';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InfoIcon from '@material-ui/icons/Info';
// import Modal from '../modal/Modal.jsx';

const MovieCard = ({ movieName, movieDuration, movieGenre, movieSynopsis }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="movie-card">
      {/* <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        <CreateMovie />
      </Modal> */}
      <h3 className="movie-card__title">{movieName}</h3>
      <div className="movie-card__wrapper">
        <div className="movie-card__description">
          <p className="movie-card__duration">
            <span className="movie-card__subtitle">Duración:</span> <br />
            {movieDuration} minutos
          </p>
          <p className="movie-card__genre">
            <span className="movie-card__subtitle">Género:</span> <br />
            {movieGenre}
          </p>
          <p className="movie-card__synopsis">
            <span className="movie-card__subtitle">Sinópsis:</span> <br />{' '}
            {movieSynopsis}
          </p>
        </div>
        <div className="movie-card__buttons">
          <div onClick={() => console.log('Si')}>
            <IconButton>
              <MoreVertIcon
                style={{ fill: 'var(--shockTwo)', fontSize: 50, zIndex: 1 }}
              />
            </IconButton>
          </div>
          <div onClick={toggleModal}>
            <IconButton>
              <InfoIcon
                style={{ fill: 'var(--shockTwo)', fontSize: 40, zIndex: 1 }}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
