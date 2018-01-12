import { push } from 'react-router-redux';


export const actionTypes = {
	FAILURE: 'FAILURE',
	MANUAL_LOGIN_USER = 'MANUAL_LOGIN_USER',
	LOGIN_SUCCESS_USER = 'LOGIN_SUCCESS_USER',
	LOGIN_ERROR_USER = 'LOGIN_ERROR_USER',
	SIGNUP_USER = 'SIGNUP_USER',
	SIGNUP_SUCCESS_USER = 'SIGNUP_SUCCESS_USER',
	SIGNUP_ERROR_USER = 'SIGNUP_ERROR_USER',
	LOGOUT_USER = 'LOGOUT_USER',
	LOGOUT_SUCCESS_USER = 'LOGOUT_SUCCESS_USER',
	LOGOUT_ERROR_USER = 'LOGOUT_ERROR_USER',
}

export function failure (error) {
    return {
	    type: actionTypes.FAILURE
    }
}

function beginLogin() {
  return { type: actionTypes.MANUAL_LOGIN_USER };
}

function loginSuccess(message) {
  return {
    type: actionTypes.LOGIN_SUCCESS_USER,
    message
  };
}

function loginError(message) {
  return {
    type: actionTypes.LOGIN_ERROR_USER,
    message
  };
}

function signUpError(message) {
  return {
    type: actionTypes.SIGNUP_ERROR_USER,
    message
  };
}

function beginSignUp() {
  return { type: actionTypes.SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: actionTypes.SIGNUP_SUCCESS_USER,
    message
  };
}

function beginLogout() {
  return { type: actionTypes.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: actionTypes.LOGOUT_ERROR_USER };
}

export function manualLogin(data) {

}

export function signUp(data) {

}

export function logOut() {

}