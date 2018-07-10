import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import injectSheet from 'react-jss';
import LogInWithFB from '../containers/LogInWithFB';

const styles = {
  fbLogin: {
    backgroundColor: '#F8F8F8',
    textAlign: 'center',
  },
};

class LoginDialog extends Component {
  constructor() {
    super();
    this.usernameInput = null;
    this.passwordInput = null;
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.submit(event);
    }
  }

  submit = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const data = {
      username: this.usernameInput.value,
      password: this.passwordInput.value,
    };
    onSubmit(data);
  }

  render() {
    const {
      classes, open, onClose, usernameErrorText, passwordErrorText, onSignUp,
    } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
        >
          <DialogTitle id="form-dialog-title">
            Log in
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                required
                error={usernameErrorText.length > 0}
                margin="dense"
                id="username"
                label="Username"
                type="username"
                helperText={usernameErrorText}
                inputRef={(input) => {
                  if (input) {
                    this.usernameInput = input;
                    setTimeout(() => { this.usernameInput.focus(); }, 300);
                  }
                }}
                fullWidth
                onKeyPress={this.handleKeyPress}
              />
              <TextField
                required
                error={passwordErrorText.length > 0}
                margin="dense"
                id="password"
                label="Password"
                type="password"
                helperText={passwordErrorText}
                inputRef={(input) => { this.passwordInput = input; }}
                fullWidth
                onKeyPress={this.handleKeyPress}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.submit} color="primary">
              Log in
            </Button>
            <Button onClick={onSignUp} color="primary">
               Or, sign up
            </Button>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
          <div className={classes.fbLogin}>
            <LogInWithFB />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default injectSheet(styles)(LoginDialog);

LoginDialog.propTypes = {
  classes: PropTypes.shape({
    fbLogin: PropTypes.string.isRequired,
  }).isRequired,
  usernameErrorText: PropTypes.string.isRequired,
  passwordErrorText: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
