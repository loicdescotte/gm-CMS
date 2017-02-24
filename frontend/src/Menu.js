import React from 'react';
import { Link } from 'react-router';
import { Grid, Navbar } from 'react-bootstrap';

class Menu extends React.Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link> &nbsp;
              <Link to="/about">About</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
    );
  }
}

export default Menu;
