import { combineReducers } from 'redux';
import homeReducer from '../modules/home/homeReducer';
import authReducer from '../modules/auth/authReducer';

const rootReducer = combineReducers({
  homeReducer,
  authReducer
});

export default rootReducer;

