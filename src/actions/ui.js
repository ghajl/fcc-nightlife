import { push } from 'react-router-redux';
import actionTypes from './types';

export function showMessage(message) {
  return {
    type: actionTypes.SHOW_MESSAGE_DIALOG,
    message,
  };
}

export function closeMessage() {
  return { type: actionTypes.CLOSE_MESSAGE_DIALOG };
}

export function openLoginDialog() {
  return { type: actionTypes.OPEN_LOGIN_DIALOG };
}

export function closeLoginDialog() {
  return { type: actionTypes.CLOSE_LOGIN_DIALOG };
}

export function openLoginMenu() {
  return { type: actionTypes.OPEN_LOGIN_MENU };
}


export function closeLoginMenu() {
  return { type: actionTypes.CLOSE_LOGIN_MENU };
}

export function returnFromLogIn() {
  return (dispatch, getState) => {
    const path = getState().reducer.user.returnPath;
    dispatch(push(path));
  };
}

export function toSignUp() {
  return (dispatch) => {
    dispatch(push('/signup'));
  };
}
