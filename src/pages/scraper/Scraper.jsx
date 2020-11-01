import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './scraper.css';

import Global from '../../Global';
import ScrapedMovie from '../../components/scrapedMoie/ScrapedMovie.jsx';

const Scraper = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    callSpider();
  }, []);

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

  return (
    <div>
      <div className="global__center--vertical movie__header">
        <h2 className="global__title">Scraper</h2>
      </div>
      <div className="global__grid">
        {movies &&
          movies.length > 0 &&
          movies
            .slice(0, 5)
            .map((movie, i) => <ScrapedMovie key={i} movie={movie} />)}
      </div>
    </div>
  );
};

export default Scraper;
