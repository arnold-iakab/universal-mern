import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { deepPurple300 } from 'material-ui/styles/colors';
import {
  homeWelcomeExplanation,
  homeAPIInfoExplanation
} from '../../common/text';
import { paperStyle } from '../../common/styles';
import { MessageDiv } from '../../common/styledComponents';
import PropTypes from 'prop-types';

const propTypes = {
  apiInfo: PropTypes.string,
  message: PropTypes.string.isRequired
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this._apiInfo = this._apiInfo.bind(this);
  }

  _apiInfo = () =>
    this.props.apiInfo != null ? this.props.apiInfo :
      "You need to log in to see where the API is!";

  render() {
    return (
      <div>
        <Paper
          style={paperStyle}
          zDepth={1}
        >
          <MessageDiv>
            {this.props.message}
          </MessageDiv>
          <MessageDiv
            style={{ color: deepPurple300 }}
          >
            {homeWelcomeExplanation}
          </MessageDiv>
        </Paper>
        <Paper
          style={paperStyle}
          zDepth={1}
        >
          <MessageDiv>Try changing this text in your code editor. You should see hot reload working on the client side. Then
                if you do a browser hard refresh, you'll see that server side rendering returns the updated text as well.
          </MessageDiv>
        </Paper>
        <Paper
          style={paperStyle}
          zDepth={1}
        >
          <MessageDiv>
            {this._apiInfo()}
          </MessageDiv>
          <MessageDiv
            style={{ color: deepPurple300 }}
          >
            {homeAPIInfoExplanation}
          </MessageDiv>
        </Paper>
      </div>
    );
  }
}

Home.propTypes = propTypes;