import React, { Component } from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';
import routes from './routes.js';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
