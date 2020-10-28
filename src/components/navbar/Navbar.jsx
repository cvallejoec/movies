import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div>
      <Link to="/movies">Movies</Link>
      <Link to="/actors">Actors</Link>
      <Link to="/create-movie">Create Movie</Link>
    </div>
  );
};

export default Navbar;
