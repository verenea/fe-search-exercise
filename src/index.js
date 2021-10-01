import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ThemedAppWrapper from './ThemedAppWrapper';
import './index.css';

ReactDOM.render(
  <Router>
    <Route path="/" component={ThemedAppWrapper} />
  </Router>,
  document.getElementById('root')
);

// *Sometimes* hot reload will have issues with React 17 in conjunction with react-scripts 4
// and certain browsers... so here's a minor harmless work-around in the event that arises
// https://stackoverflow.com/questions/65445600/hot-reload-is-not-working-in-my-react-app
if (module.hot) {
  module.hot.accept();
}
