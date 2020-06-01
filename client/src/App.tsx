import React from 'react';
import { Switch, Route, Link, } from 'react-router-dom'

import Login from '@pages/Login/Login';
import About from '@pages/About/About';
import Rules from '@pages/Rules/Rules';

import Player from './modules/Player/Player';

const player = new Player();
player.addListeners();

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/about' component={About} />
        <Route path='/rules' component={Rules} />
      </Switch>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/rules">Rules</Link>
    </main>
  );
}

export default App;
