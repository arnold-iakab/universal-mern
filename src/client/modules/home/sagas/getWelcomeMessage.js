import { call, put } from 'redux-saga/effects';
import { SET_WELCOME_MESSAGE } from '../../../common/constants';
import axios from 'axios';

const fetchWelcomeMessage = () => {
    return axios.get('http://localhost:3000/api/welcome')
        .then((res) => {
            return res.data.results.message;
        })
        .catch((error) => {
        });
};

function *getWelcomeMessage(action) {
    try {
        const message = yield call(fetchWelcomeMessage);
        yield put({ type: SET_WELCOME_MESSAGE, message: message });
    } catch (e) {
    }
}

export default getWelcomeMessage;
