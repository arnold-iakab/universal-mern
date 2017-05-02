import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';
import cookie from 'react-cookie';
import { authenticateSuccess } from '../modules/auth/authActions';

export default (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(mySaga);

  if (cookie.load('token')) {
    store.dispatch(authenticateSuccess());
  }
  return store;
};
