const isLoggedIn = (state, props) => state.authReducer['isLoggedIn'];
const error = (state, props) => state.authReducer['error'];

export {
    isLoggedIn,
    error
};
