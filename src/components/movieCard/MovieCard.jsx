import React, { useState } from 'react';
import './movieCard.css';

import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InfoIcon from '@material-ui/icons/Info';
import MovieView from '../movieView/MovieView.jsx';
import CreateMovie from '../createMovie/CreateMovie.jsx';
import Modal from '../modal/Modal.jsx';

const MovieCard = ({
  loadData,
  movieId,
  movieName,
  movieDuration,
  movieGenre,
  movieSynopsis,
}) => {
  const [isVisibleView, setIsVisibleView] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);

  const toggleModal = (type) => {
    localStorage.setItem('movieId', movieId);
    switch (type) {
      case 'edit':
        return setIsVisibleEdit(!isVisibleEdit);
      case 'view':
        return setIsVisibleView(!isVisibleView);
      default:
        return null;
    }
  };

  return (
    <div className="movie-card">
      {isVisibleEdit && (
        <Modal isVisible={isVisibleEdit} setIsVisible={setIsVisibleEdit}>
          <CreateMovie setIsVisible={setIsVisibleEdit} loadData={loadData} />
        </Modal>
      )}
      {isVisibleView && (
        <Modal isVisible={isVisibleView} setIsVisible={setIsVisibleView}>
          <MovieView />
        </Modal>
      )}
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
          <div onClick={() => toggleModal('edit')}>
            <IconButton>
              <MoreVertIcon
                style={{ fill: 'var(--shockTwo)', fontSize: 50, zIndex: 1 }}
              />
            </IconButton>
          </div>
          <div onClick={() => toggleModal('view')}>
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
