import {
  SET_WELCOME_MESSAGE,
  GET_WELCOME_MESSAGE,
  GET_API_INFO,
  SET_API_INFO
} from '../../common/constants';

export const setWelcomeMessage = (message) => {
  return {
    type: SET_WELCOME_MESSAGE,
    message
  };
};

export const getWelcomeMessage = () => {
  return {
    type: GET_WELCOME_MESSAGE
  };
};

export const getApiInfo = () => {
  return {
    type: GET_API_INFO
  };
};

export const setApiInfo = (info) => {
  return {
    type: SET_API_INFO,
    info
  };
};
