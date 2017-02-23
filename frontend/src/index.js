import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import App from './App';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/:id" component={App}>
      <Route path="/post/:id" component={List}/>
    </Route>
  </Router>
), document.getElementById('root'))
