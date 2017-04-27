import {
    AUTHENTICATE_USER,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_ERROR,
    LOG_OUT,
    GET_API_INFO
} from '../../common/constants';

export const authenticateError = (data) => {
    return {
        type: AUTHENTICATE_ERROR,
        data
    };
};

export const authenticateUser = (credentials) => {
    return {
        type: AUTHENTICATE_USER,
        credentials
    };
};

export const authenticateSuccess = () => {
    return {
        type: AUTHENTICATE_SUCCESS
    };
};

export const logOut = (dispatch) => {
    dispatch({
        type: GET_API_INFO
    });
    return {
        type: LOG_OUT
    };
};
