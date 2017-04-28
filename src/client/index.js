import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import injectTapEventPlugin from 'react-tap-event-plugin';

const reduxState = window.__INITIAL_STATE__ || undefined;
const store = createStore(reduxState);
injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('reactDiv')
);
