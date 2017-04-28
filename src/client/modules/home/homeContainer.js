import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  generateRandomNumber,
  getWelcomeMessage,
  getApiInfo
} from './homeActions';
import HomeComponent from './homeComponent';
import {
  getRandomNumber,
  retrieveWelcomeMessage,
  retrieveApiInfo
} from './selectors';
import { isLoggedIn } from '../auth/selectors';
import axios from 'axios';
import cookie from 'react-cookie';

class HomeContainer extends Component {
  componentDidMount() {
    this.props.dispatchGetWelcomeMessage();
    this.props.dispatchGetApiInfo();
  }

  render() {
    return (
      <HomeComponent
        number={this.props.number}
        message={this.props.message}
        apiInfo={this.props.apiInfo}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    message: retrieveWelcomeMessage(state, props),
    isLoggedIn: isLoggedIn(state, props),
    apiInfo: retrieveApiInfo(state, props)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGetWelcomeMessage: () => dispatch(getWelcomeMessage()),
    dispatchGetApiInfo: () => dispatch(getApiInfo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
