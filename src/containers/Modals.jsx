import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import LoginDialog from '../components/LoginDialog';
import MessageDialog from '../components/MessageDialog';
import UsersListDialog from '../components/UsersListDialog';
import { manualLogin } from '../actions/user';
import {
  closeLoginDialog,
  openLoginDialog,
  toSignUp,
  closeMessage,
} from '../actions/ui';
import { closeVisitorsList } from '../actions/bar';

import getErrorMessages from '../helpers/InputCheck';

const styles = {
  buttonProgress: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2000,
  },
};

class Modals extends Component {
  state = {
    usernameErrorText: '',
    passwordErrorText: '',
  };

  handleClickOpen = () => {
    const { dispatch } = this.props;
    dispatch(openLoginDialog());
  }

  handleSubmitLogin = (data) => {
    const username = (data && data.username) || '';
    const password = (data && data.password) || '';
    const { dispatch } = this.props;
    const { usernameError, passwordError } = getErrorMessages(username, password);
    if (usernameError || passwordError) {
      this.setState({ usernameErrorText: usernameError, passwordErrorText: passwordError });
    } else {
      this.setState({ usernameErrorText: '', passwordErrorText: '' });
      dispatch(manualLogin({
        username,
        password,
      }));
    }
  }

  goToSignUp = () => {
    const { dispatch } = this.props;
    dispatch(closeLoginDialog());
    dispatch(toSignUp());
  }

  handleCloseLogin = () => {
    const { dispatch } = this.props;
    this.setState({ usernameErrorText: '', passwordErrorText: '' });
    dispatch(closeLoginDialog());
  }

  handleCloseMessage = () => {
    const { dispatch } = this.props;
    dispatch(closeMessage());
  }

  handleCloseList = () => {
    const { dispatch } = this.props;
    dispatch(closeVisitorsList());
  }

  render() {
    const {
      classes, isLoginOpen, isMessageOpen, message, list, isListOpen, loading,
    } = this.props;
    const { usernameErrorText, passwordErrorText } = this.state;
    return (
      <React.Fragment>
        <LoginDialog
          open={isLoginOpen}
          onSubmit={this.handleSubmitLogin}
          onSignUp={() => this.goToSignUp()}
          onClose={this.handleCloseLogin}
          usernameErrorText={usernameErrorText}
          passwordErrorText={passwordErrorText}
        />

        <MessageDialog
          open={isMessageOpen}
          onClose={this.handleCloseMessage}
          message={message}
        />

        <UsersListDialog
          usersList={list}
          open={isListOpen}
          onClose={this.handleCloseList}
        />
        {loading && <CircularProgress size={160} className={classes.buttonProgress} />}
      </React.Fragment>
    );
  }
}

export default connect(({ reducer }) => (
  {
    isLoginOpen: reducer.loginDialogOpen,
    message: reducer.user.message,
    isMessageOpen: reducer.messageDialogOpen,
    loading: reducer.user.isWaiting,
    isListOpen: reducer.listDialogOpen,
    list: reducer.bar.visitors,
  }))(withStyles(styles)(Modals));

Modals.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  isLoginOpen: PropTypes.bool.isRequired,
  isMessageOpen: PropTypes.bool.isRequired,
  message: PropTypes.arrayOf(PropTypes.string).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isListOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
