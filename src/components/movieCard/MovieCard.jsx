import React from 'react';
import './movieCard.css';

import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InfoIcon from '@material-ui/icons/Info';

const MovieCard = ({ movieName, movieDuration, movieGenre, movieSynopsis }) => {
  return (
    <div className="movie-card">
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
          <IconButton>
            <MoreVertIcon style={{ fill: 'var(--baseColor)', fontSize: 50 }} />
          </IconButton>
          <IconButton>
            <InfoIcon style={{ fill: 'var(--baseColor)', fontSize: 40 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
