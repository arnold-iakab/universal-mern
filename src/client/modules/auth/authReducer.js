import {
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_ERROR,
    LOG_OUT
} from '../../common/constants';

const defaultState = {
    username: '',
    isLoggedIn: false,
    nextUrl: '',
    error: null
};

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case AUTHENTICATE_SUCCESS:
            return Object.assign({}, state, { isLoggedIn: true });

        case AUTHENTICATE_ERROR:
            return Object.assign({}, state, { error: action.data });

        case LOG_OUT:
            return Object.assign({}, state, { isLoggedIn: false });

        default:
            return state;
    }
}

export default auth;
