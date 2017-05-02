import { call, put } from 'redux-saga/effects';
import {
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_ERROR
} from '../../../common/constants';
import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

const getToken = (credentials) => {
    return axios.post('http://localhost:3000/api/authenticate', {
        username: credentials.username,
        password: credentials.password
    })
        .then((res) => {
            return res.data.token;
        })
        .catch((error) => {
        });
};

function *authenticateUser(action) {
    try {
        const token = yield call(getToken, action.credentials);
        if (token) {
            cookie.save('token', token);
            yield put({ type: AUTHENTICATE_SUCCESS });
            browserHistory.push('/');
        } else {
            yield put({ type: AUTHENTICATE_ERROR, data: "Invalid credentials!" });
        }
    } catch (e) {
    }
}

export default authenticateUser;
