import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import getErrorMessages from '../helpers/InputCheck';
import Page from './Page';
import LogInWithFB from '../containers/LogInWithFB';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 0 auto',
    marginTop: '60px',
    '@media (max-width: 600px)': {
      marginTop: '50px',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 500,
    maxWidth: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 500,
    maxWidth: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    maxWidth: '100%',
  },
  menu: {
    width: 200,
  },
  button: {
    marginTop: 50,
  },
  fbLogin: {
    textAlign: 'center',
    marginTop: 50,
  },
});

class Signup extends Component {
  constructor() {
    super();
    this.usernameInput = null;
    this.passwordInput = null;
    this.state = {
      usernameErrorMessage: '',
      passwordErrorMessage: '',
    };
  }

  onSignupSubmit = (event) => {
    event.preventDefault();
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;
    const { usernameError, passwordError } = getErrorMessages(username, password);
    const { signUp } = this.props;
    if (usernameError || passwordError) {
      this.setState({
        usernameErrorMessage: usernameError,
        passwordErrorMessage: passwordError,
      });
    } else {
      signUp({ username, password });
    }
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onSignupSubmit(event);
    }
  }

  render() {
    const { classes, location } = this.props;
    const { usernameErrorMessage, passwordErrorMessage } = this.state;
    return (
      <Page location={location}>
        <div className={classes.root}>
          <div className={classes.container}>
            <form className={classes.form}>
              <TextField
                className={classes.textField}
                required
                error={usernameErrorMessage.length > 0}
                id="username"
                label="Username"
                type="username"
                helperText={usernameErrorMessage}
                inputRef={(input) => {
                  if (input) {
                    this.usernameInput = input;
                    setTimeout(() => { this.usernameInput.focus(); }, 300);
                  }
                }}
                margin="normal"
                onKeyPress={this.handleKeyPress}
              />
              <TextField
                className={classes.textField}
                required
                error={passwordErrorMessage.length > 0}
                id="password"
                label="Password"
                type="password"
                helperText={passwordErrorMessage}
                inputRef={(input) => { this.passwordInput = input; }}
                margin="normal"
                onKeyPress={this.handleKeyPress}
              />
            </form>
            <div className={classes.button}>
              <Button raised color="accent" onClick={this.onSignupSubmit}>
                sign up
              </Button>
            </div>
            <div className={classes.fbLogin}>
              <LogInWithFB />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default withStyles(styles)(Signup);

Signup.propTypes = {
  signUp: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};
