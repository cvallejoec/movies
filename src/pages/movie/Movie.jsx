import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './movie.css';

import Global from '../../Global';
import MovieCard from '../../components/movieCard/MovieCard.jsx';

const Movie = () => {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(Global.url + '/api/movie')
      .then((res) => {
        setLoading(false);
        setMovies(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="global__wrapper">
      <h2 className="global__title">Películas</h2>
      <div className="global__grid">
        {loading ? (
          <h2>Loading...</h2>
        ) : !movies.length ? (
          <h2>Aún no tienes películas</h2>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.movie_id}
              movieName={movie.movie_name}
              movieDuration={movie.movie_duration}
              movieGenre={movie.movie_genre}
              movieSynopsis={movie.movie_synopsis}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Movie;
