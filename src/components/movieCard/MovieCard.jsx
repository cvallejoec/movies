import React from 'react';
import './movieCard.css';

const MovieCard = ({ movieName, movieDuration, movieGenre, movieSynopsis }) => {
  return (
    <div className="movie-card">
      <h3 className="movie-card__title">{movieName}</h3>
      <div className="global__center">
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
          <button className="button__options">E</button>
          <button className="button__open">I</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
