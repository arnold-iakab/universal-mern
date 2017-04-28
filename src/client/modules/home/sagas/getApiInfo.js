import { call, put } from 'redux-saga/effects'
import { SET_API_INFO } from '../../../common/constants'
import axios from 'axios';
import cookie from 'react-cookie';

const fetchApiInfo = () => {
    return axios.get('http://localhost:3000/api/', {
        headers: { 'x-access-token': cookie.load('token') }
    })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

function *getApiInfo(action) {
    try {
        let info = yield call(fetchApiInfo);
        info = info.hasOwnProperty('success') ? null : info
        yield put({ type: SET_API_INFO, info });
    } catch (e) {
        console.log(e);
    }
}

export default getApiInfo;
