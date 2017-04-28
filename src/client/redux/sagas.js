import { fork, takeLatest } from 'redux-saga/effects';
import {
    GET_WELCOME_MESSAGE,
    AUTHENTICATE_USER,
    GET_API_INFO
} from '../common/constants';
import getWelcomeMessage from '../modules/home/sagas/getWelcomeMessage';
import authenticateUser from '../modules/auth/sagas/authenticateUser';
import getApiInfo from '../modules/home/sagas/getApiInfo';


export function *mySaga() {
    yield fork(takeLatest, GET_WELCOME_MESSAGE, getWelcomeMessage);
    yield fork(takeLatest, AUTHENTICATE_USER, authenticateUser);
    yield fork(takeLatest, GET_API_INFO, getApiInfo);
}

export default mySaga;
