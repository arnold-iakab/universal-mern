import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../auth/selectors';
import { logOut } from '../auth/authActions';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { cleanLink } from '../../common/styles';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

class App extends Component {
  constructor(props) {
    super(props);
    this._authenticationButtonLabel = this._authenticationButtonLabel.bind(this);
    this._handleAuthentication = this._handleAuthentication.bind(this);
  }

  _authenticationButtonLabel = () =>
    this.props.isLoggedIn ? 'Log Out' : 'Log In'

  _handleAuthentication = () => {
    if (this.props.isLoggedIn) {
      cookie.remove("token");
      this.props.dispatchLogOut();
      browserHistory.push("/");
    } else {
      browserHistory.push("/login");
    }
  }

  render() {
    return (
      <MuiThemeProvider
        muiTheme={this.props.muiTheme}
      >
        <AppContainer>
          <Toolbar>
            <ToolbarGroup>
              <Link to="/" style={cleanLink}>
                <ToolbarTitle
                  text="Universal React"
                />
              </Link>
              <FlatButton
                label={this._authenticationButtonLabel()}
                onTouchTap={this._handleAuthentication} />
              <FlatButton
                label="Secret"
                primary={true}
                containerElement={<Link to="/secret"></Link>} />
            </ToolbarGroup>
          </Toolbar>
          {this.props.children}
        </AppContainer>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = (state, props) => {
  return {
    isLoggedIn: isLoggedIn(state, props)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogOut: () => dispatch(logOut(dispatch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
