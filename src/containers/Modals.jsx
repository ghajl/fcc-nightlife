import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import LoginDialog from '../components/LoginDialog';
import MessageDialog from '../components/MessageDialog';
import VisitorsListDialog from '../components/VisitorsListDialog';
import {
  closeLoginDialog,
  openLoginDialog,
  toSignUp,
  closeMessage,
} from '../actions/ui';
import { closeVisitorsList } from '../actions/bar';
import { closeBasket, manualLogin } from '../actions/user';
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

  handleCloseVisitorsList = () => {
    const { dispatch } = this.props;
    dispatch(closeVisitorsList());
  }

  handleCloseBasketList = () => {
    const { dispatch } = this.props;
    dispatch(closeBasket());
  }

  render() {
    const {
      classes,
      loginOpen,
      messageOpen,
      message,
      visitorsList,
      visitorsListOpen,
      loading,
    } = this.props;
    const { usernameErrorText, passwordErrorText } = this.state;
    return (
      <React.Fragment>
        <LoginDialog
          open={loginOpen}
          onSubmit={this.handleSubmitLogin}
          onSignUp={() => this.goToSignUp()}
          onClose={this.handleCloseLogin}
          usernameErrorText={usernameErrorText}
          passwordErrorText={passwordErrorText}
        />

        <MessageDialog
          open={messageOpen}
          onClose={this.handleCloseMessage}
          message={message}
        />

        <VisitorsListDialog
          visitorsList={visitorsList}
          open={visitorsListOpen}
          onClose={this.handleCloseVisitorsList}
        />
        {loading && <CircularProgress size={160} className={classes.buttonProgress} />}
      </React.Fragment>
    );
  }
}

export default connect(({ reducer }) => (
  {
    loginOpen: reducer.loginDialogOpen,
    message: reducer.user.message,
    messageOpen: reducer.messageDialogOpen,
    loading: reducer.user.isWaiting,
    visitorsListOpen: reducer.listDialogOpen,
    visitorsList: reducer.bar.visitors,
    basketOpen: reducer.basketDialogOpen,
    basketList: reducer.user.basket,
  }))(withStyles(styles)(Modals));

Modals.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  loginOpen: PropTypes.bool.isRequired,
  messageOpen: PropTypes.bool.isRequired,
  message: PropTypes.arrayOf(PropTypes.string).isRequired,
  visitorsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  visitorsListOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
