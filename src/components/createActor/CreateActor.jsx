import React, { useState } from 'react';
import axios from 'axios';
import './createActor.css';

import Global from '../../Global';

const CreateActor = ({ setIsVisible, loadData }) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleForm = (e) => {
    e.preventDefault();
    setError(false);
    if (name && age) {
      const actor = {
        actorName: name,
        actorAge: age,
        actorImg:
          'https://is2-ssl.mzstatic.com/image/thumb/Purple124/v4/fc/79/af/fc79af8a-f8a3-9484-4b12-d1609da1413e/source/512x512bb.jpg',
      };

      axios
        .post(Global.url + '/api/actor', actor)
        .then((res) => {
          console.log(res);
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
    setAge('');
  };

  const closeModal = () => {
    loadData();
    setIsVisible(false);
  };

  return (
    <div>
      <h2>Nuevo Actor</h2>
      <form>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="age">Edad:</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
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

export default CreateActor;
