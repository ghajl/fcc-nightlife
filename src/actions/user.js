import { axiosInstance } from '../../config/app';
import actionTypes from './types';
import { getPersistor } from '../store';
import { modifyVisitorsList } from './bar';

function beginLogin() {
  return { type: actionTypes.MANUAL_LOGIN_USER };
}

function loginSuccess(username, bars, userID, message) {
  return {
    type: actionTypes.LOGIN_SUCCESS_USER,
    message,
    username,
    bars,
    userID,
  };
}

function loginError(message) {
  return {
    type: actionTypes.LOGIN_ERROR_USER,
    message,
  };
}

function beginSignUp() {
  return { type: actionTypes.SIGNUP_USER };
}

function signUpError(message) {
  return {
    type: actionTypes.SIGNUP_ERROR_USER,
    message,
  };
}

function signUpSuccess(username, userID, message) {
  return {
    type: actionTypes.SIGNUP_SUCCESS_USER,
    message,
    username,
    userID,
  };
}

function beginLogout() {
  return { type: actionTypes.LOGOUT_USER };
}

function logoutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: actionTypes.LOGOUT_ERROR_USER };
}

export function manualLogin(data) {
  return (dispatch, getState) => {
    dispatch(beginLogin());
    const bars = getState().reducer.location.locationBars != null
      ? getState().reducer.location.locationBars.map(bar => bar.id)
      : [];
    const loginData = { ...data, ...{ bars } };
    return axiosInstance.post('/login', loginData)
      .then((response) => {
        dispatch(loginSuccess(data.username, response.data.bars, response.data.userID, 'You have been successfully logged in!'));
        // add user to users list of bar if user came here from add button on place card
        if (getState().reducer.guestBar) {
          const barID = getState().reducer.guestBar;
          const { userID } = response.data;
          const operation = 'ADD';
          const fromLogin = true;
          modifyVisitorsList(barID, userID, operation, dispatch, fromLogin);
        }
      })
      .catch(() => {
        dispatch(loginError('Invalid username or password'));
      });
  };
}

export function signUp(data) {
  return (dispatch, getState) => {
    dispatch(beginSignUp());
    return axiosInstance.post('/signup', data)
      .then((response) => {
        dispatch(signUpSuccess(data.username, response.data.userID, 'You have successfully registered an account!'));
        // add user to users list in Place if user came here from add button on place card
        if (getState().reducer.guestBar) {
          const barID = getState().reducer.guestBar;
          const { userID } = response.data;
          const operation = 'ADD';
          const fromSignup = true;
          modifyVisitorsList(barID, userID, operation, dispatch, fromSignup);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === '409') {
          dispatch(signUpError('This username is already in use'));
        } else {
          dispatch(signUpError('Something went wrong when signing up'));
        }
      });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());
    return axiosInstance.get('/logout')
      .then(() => {
        getPersistor().purge();
        dispatch(logoutSuccess());
      })
      .catch(() => {
        dispatch(logoutError());
      });
  };
}

export function startFacebookLogin() {
  return { type: actionTypes.START_FACEBOOK_LOGIN };
}

export function endFacebookLogin() {
  return { type: actionTypes.END_FACEBOOK_LOGIN };
}

function toLogIn() {
  return { type: actionTypes.OPEN_LOGIN_DIALOG };
}

function saveGuestBar(barID) {
  return {
    type: actionTypes.SAVE_GUEST_BAR,
    barID,
  };
}

export function loginAndAdd(barID) {
  return (dispatch) => {
    dispatch(saveGuestBar(barID));
    dispatch(toLogIn());
  };
}
