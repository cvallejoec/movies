import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './createMovie.css';

import Global from '../../Global';

const CreateMovie = () => {
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

  const handleForm = (e) => {
    e.preventDefault();
    setError(false);
    if (name && duration && genre != '' && synopsis) {
      const movie = {
        movieName: name,
        movieDuration: duration,
        movieGenre: genre,
        movieSynopsis: synopsis,
      };

      axios
        .post(Global.url + '/api/movie', movie)
        .then((res) => {
          return res.data.data.insertId;
        })
        .then((movieId) => {
          toAddActors.map((toAddActor) => {
            return axios.post(Global.url + '/api/movie/link', {
              movieId,
              actorId: toAddActor.actorId,
            });
          });
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
    setToAddActors([]);
    setToRemoveActors([]);
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
    const newActors = selectedActors.filter(
      (selectedActor) => selectedActor.actorName !== actorName
    );
    setSelectedActors(newActors);
    const newActorsToRemove = toRemoveActors.filter(
      (selectedActor) => selectedActor.actorName !== actorName
    );
    setToRemoveActors(newActorsToRemove);
  };

  return (
    <div>
      <h2>Nueva Película</h2>
      <form>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="duration">Duración (minutos): </label>
          <input
            type="number"
            name="duration"
            id="duration"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            placeholder="162"
          />
        </div>
        <div>
          <label>Género:</label>
          <select
            id="genre"
            name="genre"
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
        <div>
          <label htmlFor="synopsis">Sinópsis:</label>
          <textarea
            type="text"
            name="synopsis"
            id="synopsis"
            onChange={(e) => setSynopsis(e.target.value)}
            value={synopsis}
          />
        </div>
        <div>
          <label>Actores:</label>
          <select onChange={(e) => handleActor(e)}>
            <option value="">Escoge un actor</option>
            {options && options}
          </select>
          <div>
            {selectedActors &&
              selectedActors.length > 0 &&
              selectedActors.map((selectedActor) => (
                <p key={selectedActor.actorId} onClick={(e) => removeActor(e)}>
                  {selectedActor.actorName}
                </p>
              ))}
          </div>
        </div>
        <button type="submit" onClick={(e) => handleForm(e)}>
          Guardar
        </button>
      </form>
      {error ? <h2>Debe llenar todos los campos</h2> : null}
    </div>
  );
};

export default CreateMovie;
