import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './movie.css';

import Global from '../../Global';
import MovieCard from '../../components/movieCard/MovieCard.jsx';
import CreateMovie from '../../components/createMovie/CreateMovie.jsx';
import Modal from '../../components/modal/Modal.jsx';

const Movie = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
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
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="global__wrapper movie">
      {isVisible && (
        <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
          <CreateMovie setIsVisible={setIsVisible} loadData={loadData} />
        </Modal>
      )}
      <div className="global__center--vertical movie__header">
        <h2 className="global__title">Películas</h2>
        <button className="global__button" onClick={toggleModal}>
          Crear Película
        </button>
      </div>
      <div className="global__grid">
        {loading ? (
          <h2>Loading...</h2>
        ) : !movies.length ? (
          <h2>Aún no tienes películas</h2>
        ) : (
          movies.map((movie) => (
            <MovieCard
              loadData={loadData}
              key={movie.movie_id}
              movieId={movie.movie_id}
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
