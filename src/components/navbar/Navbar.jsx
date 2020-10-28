import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/movies" className="navbar__menu">
        Películas
      </Link>
      <Link to="/actors" className="navbar__menu">
        Actores
      </Link>
      {/* <Link to="/create-movie">Create Movie</Link>
      <Link to="/create-actor">Create Actor</Link> */}
    </div>
  );
};

export default Navbar;
