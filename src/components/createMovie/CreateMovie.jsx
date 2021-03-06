import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './createMovie.css';

import Global from '../../Global';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CreateMovie = ({ setIsVisible, loadData }) => {
  // Card
  const [isNew, setIsNew] = useState(false);
  const [movieId, setMovieId] = useState(localStorage.getItem('movieId'));
  // Formulario
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [genre, setGenre] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [options, setOptions] = useState();
  // Actores
  const [selectedActors, setSelectedActors] = useState([]);
  const [toAddActors, setToAddActors] = useState([]);
  const [toRemoveActors, setToRemoveActors] = useState([]);

  useEffect(() => {
    if (movieId) {
      setIsNew(false);
      axios
        .get(`${Global.url}/api/movie/${movieId}`)
        .then((res) => {
          const movie = res.data.data[0];
          setName(movie.movie_name);
          setDuration(movie.movie_duration);
          setGenre(movie.movie_genre);
          setSynopsis(movie.movie_synopsis);
          return axios.get(`${Global.url}/api/actor/movie/${movieId}`);
        })
        .then((res) => {
          const actors = res.data.data;
          actors.map((actor) => {
            const newActor = {
              actorId: actor.actor_id,
              actorName: actor.actor_name,
            };
            return setSelectedActors((prevState) => [...prevState, newActor]);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsNew(true);
    }
    return () => {
      localStorage.removeItem('movieId');
    };
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    setError(false);
    if (name && duration && genre != '' && synopsis) {
      const movie = {
        movieId,
        movieName: name,
        movieDuration: duration,
        movieGenre: genre,
        movieSynopsis: synopsis,
      };

      axios
        .post(Global.url + '/api/movie', movie)
        .then((res) => {
          if (res.data.data.insertId) {
            localStorage.setItem('movieId', res.data.data.insertId);
            setMovieId(localStorage.getItem('movieId'));
          }
        })
        .then(() => {
          toAddActors.map((toAddActor) => {
            return axios.post(Global.url + '/api/movie/link', {
              movieId: localStorage.getItem('movieId'),
              actorId: toAddActor.actorId,
            });
          });
        })
        .then(() => {
          toRemoveActors.map((toRemoveActor) => {
            return axios.post(Global.url + '/api/movie/unLink', {
              movieId: localStorage.getItem('movieId'),
              actorId: toRemoveActor[0].actorId,
            });
          });
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });

      cleanForm();
    } else {
      setError(true);
    }
  };

  const cleanForm = () => {
    setName('');
    setDuration('');
    setGenre('');
    setSynopsis('');
    setSelectedActors([]);
    // setToAddActors([]);
    // setToRemoveActors([]);
  };

  useEffect(() => {
    axios
      .get(Global.url + '/api/actor')
      .then((res) => {
        setOptions(
          res.data.data.map((actor) => (
            <option
              key={actor.actor_id}
              value={`${actor.actor_id},${actor.actor_name}`}
            >
              {actor.actor_name}
            </option>
          ))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleActor = (e) => {
    // Verifica si no seleccionó el Select por defecto
    if (e.target.value.length > 0) {
      const selectedActorInfo = e.target.value.split(',');
      const actorId = selectedActorInfo[0];
      const actorName = selectedActorInfo[1];
      const foundActor = selectedActors.find(
        (selectedActor) => selectedActor.actorId === actorId
      );
      // Verifica que no esté ya ese actor en la lista
      if (!foundActor) {
        const actor = {
          actorId,
          actorName,
        };
        setSelectedActors([...selectedActors, actor]);
        setToAddActors([...toAddActors, actor]);
      }
    }
  };

  const removeActor = (e) => {
    const actorName = e.target.innerHTML;
    console.log(actorName);
    const removedActor = selectedActors.filter(
      (selectedActor) => selectedActor.actorName === actorName
    );
    setToRemoveActors([...toRemoveActors, removedActor]);

    const newActors = selectedActors.filter(
      (selectedActor) => selectedActor.actorName !== actorName
    );
    setSelectedActors(newActors);
  };

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`${Global.url}/api/movie/${movieId}`)
      .then((res) => closeModal())
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    loadData();
    setIsVisible(false);
  };

  return (
    <div className="create-movie">
      <h2>{isNew ? 'Nueva Película' : 'Editar Película'}</h2>
      <form className="global__form">
        <div className="global__form-container">
          <label htmlFor="name" className="form__label">
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form__input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="John Doe"
          />
        </div>

        <div className="global__form-container">
          <label htmlFor="duration" className="form__label">
            Duración (minutos):{' '}
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            className="form__input"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            placeholder="162"
          />
        </div>

        <div className="global__form-container">
          <label className="form__label">Género:</label>
          <select
            id="genre"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="" defaultValue>
              Escoge una
            </option>
            <option value="Animadas">Animadas</option>
            <option value="Romántica">Romántica</option>
            <option value="Comedia">Comedia</option>
            <option value="Terror">Terror</option>
          </select>
        </div>

        <div className="global__form-container">
          <label htmlFor="synopsis" className="form__label">
            Sinópsis:
          </label>
          <textarea
            type="text"
            name="synopsis"
            id="synopsis"
            className="form__input"
            onChange={(e) => setSynopsis(e.target.value)}
            value={synopsis}
          />
        </div>

        <div className="global__form-container create-movie__actors-container">
          <label className="form__label">Actores:</label>
          <select onChange={(e) => handleActor(e)}>
            <option value="">Escoge un actor</option>
            {options && options}
          </select>
          <div className="create-movie__actors">
            {selectedActors &&
              selectedActors.length > 0 &&
              selectedActors.map((selectedActor) => (
                <div
                  key={selectedActor.actorId}
                  onClick={(e) => removeActor(e)}
                  className="create-movie__actor"
                >
                  <p>{selectedActor.actorName}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="form__buttons">
          <button
            type="submit"
            onClick={(e) => handleForm(e)}
            className="global__button--negative"
          >
            Guardar
          </button>
          {!isNew && (
            <button
              type="submit"
              onClick={(e) => deleteMovie(e)}
              className="global__button--low"
            >
              Borrar
            </button>
          )}
        </div>
      </form>
      {error ? <h2>Debe llenar todos los campos</h2> : null}
    </div>
  );
};

export default CreateMovie;
