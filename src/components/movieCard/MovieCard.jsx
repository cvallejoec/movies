import React from 'react';
import './movieCard.css';

const MovieCard = ({ movieName, movieDuration, movieGenre, movieSynopsis }) => {
  return (
    <div>
      <h2>Card</h2>
      <h3>{movieName}</h3>
      <p>Duración: {movieDuration}</p>
      <p>Género: {movieGenre}</p>
      <p>Sinópsis: {movieSynopsis}</p>
    </div>
  );
};

export default MovieCard;
