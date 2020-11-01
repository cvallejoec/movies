import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase/index';
import axios from 'axios';
import './createActor.css';

import Global from '../../Global';

const CreateActor = ({ setIsVisible, loadData }) => {
  const [error, setError] = useState(false);
  const [actorId, setActorId] = useState(localStorage.getItem('actorId'));
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    getActor();

    return () => {
      localStorage.removeItem('actorId');
    };
  }, []);

  const getActor = () => {
    if (actorId) {
      axios
        .get(`${Global.url}/api/actor/${actorId}`)
        .then((res) => {
          const actor = res.data.data[0];
          setName(actor.actor_name);
          setAge(actor.actor_age);
          setUrl(actor.actor_img);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    setError(false);
    if (image) {
      handleUploadImage();
    } else {
      handleForm(url);
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUploadImage = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
        setError(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            handleForm(url);
          });
      }
    );
  };

  const handleForm = (url) => {
    if (name && age && url) {
      const actor = {
        actorId,
        actorName: name,
        actorAge: age,
        actorImg: url,
      };

      axios
        .post(Global.url + '/api/actor', actor)
        .then((res) => {
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
    <div className="create-actor">
      {!actorId ? <h2>Nuevo Actor</h2> : <h2>Editar Actor</h2>}
      <form className="global__form">
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
        <div>
          <label htmlFor="image">Foto:</label>
          <input type="file" onChange={handleChange} />
          {url && <img src={url} alt="actor-image" width="100" />}
        </div>
        <button type="submit" onClick={(e) => submitForm(e)}>
          Guardar
        </button>
      </form>
      {error ? <h2>Debe llenar todos los campos</h2> : null}
    </div>
  );
};

export default CreateActor;
