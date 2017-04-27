const getRandomNumber = (state, props) => state.homeReducer['number'];
const retrieveWelcomeMessage = (state, props) => state.homeReducer['message'];
const retrieveApiInfo = (state, props) => state.homeReducer['apiInfo'];

export {
    getRandomNumber,
    retrieveWelcomeMessage,
    retrieveApiInfo
};