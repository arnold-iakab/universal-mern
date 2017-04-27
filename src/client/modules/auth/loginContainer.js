import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { authenticateUser, authenticateError } from './authActions';
import { error } from './selectors';

class LogInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { credentials: { username: '', password: '' } }
        this._handleOnChange = this._handleOnChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentDidUpdate = () => {
        if (this.props.error) {
            alert(this.props.error);
            this.props.dispatchAuthenticateError(null);
        }
    }

    _handleOnChange(event) {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        return this.setState({ credentials: credentials });
    }

    _handleSubmit(event) {
        event.preventDefault();
        this.props.dispatchLogInUser(this.state.credentials);
    }

    render() {
        return (
            <div>
                <form onSubmit={this._handleSubmit}>
                    <TextField
                        hintText="Username"
                        floatingLabelText="Username"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this._handleOnChange}
                    /><br />
                    <TextField
                        type="password"
                        hintText="Password"
                        floatingLabelText="Passoword"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this._handleOnChange}
                    /><br />
                    <RaisedButton
                        type="submit"
                        label="Login"
                        primary={true}
                    />
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        error: error(state, props)
    };
};

function mapDispatchToProps(dispatch) {
    return {
        dispatchLogInUser: (credentials) => dispatch(authenticateUser(credentials)),
        dispatchAuthenticateError: (error) => dispatch(authenticateError(error))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);