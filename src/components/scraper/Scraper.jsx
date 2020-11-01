import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './scraper.css';

import Global from '../../Global';
import ScrapedMovie from '../scrapedMovie/ScrapedMovie.jsx';
import Charts from '../charts/Charts.jsx';
import Modal from '../modal/Modal.jsx';
import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const Scraper = () => {
  const [movies, setMovies] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    callSpider();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const movies_copy = movies;
      setDataset(generateDataset(movies_copy));
    }
  }, [movies]);

  const callSpider = () => {
    axios
      .get(Global.spider)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="scraper">
      {isVisible && (
        <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
          <div>
            <h2>Información</h2>
            <div className="scraper-info__body">
              <p>
                Utilizando técnicas de Web Scraping he extraido las top 250
                películas de la página oficial de{' '}
                <a
                  href="https://www.imdb.com/chart/top/"
                  className="scaper-info__link"
                  target="_blank"
                >
                  IMDb.
                </a>{' '}
                Posteriormente he analizado los resultados a través de un
                gráfico y he respondido a la pregunta: <br />
              </p>
              <p>
                ¿Influye la antiguedad de la película en tener un mejor
                ranking/calificación?
              </p>
            </div>
          </div>
        </Modal>
      )}
      <div className="global__center--vertical movie__header">
        <h2 className="global__title">Scraper</h2>
        <div onClick={() => toggleModal()}>
          <IconButton>
            <InfoIcon
              style={{ fill: 'var(--shockTwo)', fontSize: 50, zIndex: 1 }}
            />
          </IconButton>
        </div>
      </div>
      <div className="global__grid">
        {movies &&
          movies.length > 0 &&
          movies
            .slice(0, 8)
            .map((movie, i) => <ScrapedMovie key={i} movie={movie} />)}
      </div>
      {dataset.length > 0 && <Charts data={dataset} />}
    </div>
  );
};

const generateDataset = (data) => {
  const data_sort = sortData(data);
  const lowest_year = parseInt(data_sort[0].anios);
  const highest_year = parseInt(data_sort[249].anios);
  const steps = Math.ceil((highest_year - lowest_year) / 10);
  const emptyDataset = setSteps(lowest_year, highest_year, steps);
  const filledDataset = fillDataset(data, emptyDataset);
  const dataset = recalculateDataset(filledDataset, data.length);
  // return data_sort;
  return dataset;
};

const sortData = (data) => {
  const data_sorted = data.sort(function (a, b) {
    if (a.anios > b.anios) return 1;
    if (a.anios < b.anios) return -1;
    return 0;
  });
  return data_sorted;
};

const setSteps = (lowest_year, highest_year, steps) => {
  let dataset = [];
  for (let i = lowest_year; i < highest_year; i += steps) {
    dataset.push({
      name: `${i}`,
      y: 0,
    });
  }
  return dataset;
};

const fillDataset = (data_sorted, dataset) => {
  data_sorted.map((item) => {
    for (let i = 0; i < dataset.length; i++) {
      if (dataset[i + 1]) {
        if (
          item.anios >= parseInt(dataset[i].name) &&
          item.anios < parseInt(dataset[i + 1].name)
        ) {
          dataset[i].y++;
        }
      } else {
        if (item.anios >= parseInt(dataset[i].name)) {
          dataset[i].y++;
        }
      }
    }
  });
  return dataset;
};

const recalculateDataset = (dataset, total) => {
  return dataset.map((item) => ({
    ...item,
    y: (item.y * 100) / total,
  }));
};

export default Scraper;
