import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Home from './Home.js';
import About from './About.js';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
      <Route path="/post/:id" component={Home}/>
    </Route>
    <Route path="/about" component={About}/>
  </Router>
);
