import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<div>{routes}</div>, div);
});
