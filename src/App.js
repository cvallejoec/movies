import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.css';

import Actor from './pages/actor/Actor';
import Movie from './pages/movie/Movie';
import Navbar from './components/navbar/Navbar';
// import CreateMovie from './components/createMovie/CreateMovie';
// import CreateActor from './components/createActor/CreateActor';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Movie} />
        <Route exact path="/movies" component={Movie} />
        <Route exact path="/actors" component={Actor} />
        {/* <Route exact path="/create-movie" component={CreateMovie} />
        <Route exact path="/create-actor" component={CreateActor} /> */}
      </Switch>
    </Router>
  );
};

export default App;
