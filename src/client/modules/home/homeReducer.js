import {
  GENERATE_RANDOM_NUMBER,
  SET_WELCOME_MESSAGE,
  SET_API_INFO
} from '../../common/constants';

const defaultState = {
  message: '',
  apiInfo: null
};

function home(state = defaultState, action) {
  switch (action.type) {
    case SET_WELCOME_MESSAGE:
      return Object.assign({}, state, { message: action.message });

    case SET_API_INFO:
      return Object.assign({}, state, { apiInfo: action.info });

    default:
      return state;
  }
}

export default home;