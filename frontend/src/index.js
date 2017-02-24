import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Grid, Jumbotron } from 'react-bootstrap';
import routes from './routes.js';
import './index.css';

ReactDOM.render((
  <div>
    <Jumbotron>
      <Grid>
        <h1>GM-CMS</h1>
        <br/>
        <div>
          {routes}
        </div>
        <p>
        </p>
      </Grid>
    </Jumbotron>
  </div>
), document.getElementById('root'))
