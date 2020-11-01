import React from 'react';
import './scrapedMovie.css';
import '../actorCard/actorCard.css';

import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import StarIcon from '@material-ui/icons/Star';

const ScrapedMovie = ({ movie }) => {
  return (
    <div
      className="actor-card scraped-movie"
      style={{ backgroundImage: `url(${movie.thumbnails})` }}
    >
      <div></div>
      <div className="actor-card__body">
        <h2 className="actor-card__name">{movie.titles}</h2>
        <div className="scraped-movie__info">
          <InsertInvitationIcon style={{ fill: 'var(--text)' }} />
          <p className="actor-car__age">{movie.anios}</p>
        </div>
        <div className="scraped-movie__info">
          <StarIcon style={{ fill: 'var(--yellow)' }} />
          <p className="actor-car__age">{movie.calificaciones}</p>
        </div>
      </div>
    </div>
  );
};

export default ScrapedMovie;
