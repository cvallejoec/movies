import React, { useState } from 'react';
import axios from 'axios';
import './createMovie.css';

import Global from '../../Global';

const CreateMovie = () => {
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [genre, setGenre] = useState('Escoger');
  const [synopsis, setSynopsis] = useState('');

  const handleForm = (e) => {
    e.preventDefault();
    setError(false);
    if (name && duration && genre != 'Escoger' && synopsis) {
      const movie = {
        movieName: name,
        movieDuration: duration,
        movieGenre: genre,
        movieSynopsis: synopsis,
      };

      axios
        .post(Global.url + '/api/movie', movie)
        .then((res) => {
          const movieId = res.data.data.insertId;
          console.log(movieId);
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
    setGenre('Escoger');
    setSynopsis('');
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
            <option value="Escoger" defaultValue>
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
        <button type="submit" onClick={(e) => handleForm(e)}>
          Guardar
        </button>
      </form>
      {error ? <h2>Debe llenar todos los campos</h2> : null}
    </div>
  );
};

export default CreateMovie;
