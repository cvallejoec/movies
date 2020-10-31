import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './movieView.css';

import Global from '../../Global';

const MovieView = () => {
  const [movieId, setMovieId] = useState(localStorage.getItem('movieId'));
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState({});

  useEffect(() => {
    axios
      .get(`${Global.url}/api/movie/${movieId}`)
      .then((res) => {
        setMovie(res.data.data[0]);
        return axios.get(`${Global.url}/api/actor/movie/${movieId}`);
      })
      .then((res) => {
        setActors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      localStorage.removeItem('movieId');
    };
  }, []);

  return movie ? (
    <div className="movie-view">
      <h2 className="movie-view__title">{movie.movie_name}</h2>
      <p className="movie-view__duration">{movie.movie_duration} minutos</p>
      <div className="movie-view__body">
        <div className="movie-view__description">
          <h3>Sinopsis</h3>
          <p>{movie.movie_synopsis}</p>
        </div>
        <div className="movie-view__actors-container">
          <h3>Actores</h3>
          <div className="movie-view__actors">
            {actors.length > 0 ? (
              actors.map((actor) => (
                <div className="movie-view__actor">
                  <p>{actor.actor_name}</p>
                  <p>{actor.actor_age}</p>
                </div>
              ))
            ) : (
              <h4>Aún no se han registrado actores en la película</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export default MovieView;
