import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/app/appComponent';
import Home from './modules/home/homeContainer';
import LogInPage from './modules/auth/loginContainer';
import SecretPage from './modules/home/secretContainer';
import cookie from 'react-cookie';

function redirectIfLoggedIn(nextState, replace) {
  if (cookie.load('token')) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireAuth(nextState, replace) {
  let token = cookie.load('token');

  if (typeof token == 'undefined') {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const routes =
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route
      path="/login"
      onEnter={redirectIfLoggedIn}
      component={LogInPage}
    />
    <Route
      path="/secret"
      onEnter={requireAuth}
      component={SecretPage}
    />
  </Route>;

export default routes;
