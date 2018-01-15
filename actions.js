import { push } from 'react-router-redux';
import axios from "axios";

export const actionTypes = {
	MANUAL_LOGIN_USER:  'MANUAL_LOGIN_USER',
	LOGIN_SUCCESS_USER:  'LOGIN_SUCCESS_USER',
	LOGIN_ERROR_USER:  'LOGIN_ERROR_USER',
	SIGNUP_USER:  'SIGNUP_USER',
	SIGNUP_SUCCESS_USER:  'SIGNUP_SUCCESS_USER',
	SIGNUP_ERROR_USER:  'SIGNUP_ERROR_USER',
	LOGOUT_USER:  'LOGOUT_USER',
	LOGOUT_SUCCESS_USER:  'LOGOUT_SUCCESS_USER',
	LOGOUT_ERROR_USER:  'LOGOUT_ERROR_USER',
}



function beginLogin() {
  return { type: actionTypes.MANUAL_LOGIN_USER };
}

function loginSuccess(username, message) {
  return {
    type: actionTypes.LOGIN_SUCCESS_USER,
    message,
    username
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

function signUpSuccess(username, message) {
  return {
    type: actionTypes.SIGNUP_SUCCESS_USER,
    message,
    username
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
	return (dispatch) => {
		dispatch(beginLogin());

		return axios.post('/login', data)
			 .then((response) => {
		          dispatch(loginSuccess(data.username, 'You have been successfully logged in'));
		          dispatch(push('/'));
		      })
		      .catch((err) => {
		        dispatch(loginError('Invalid username or password'));
		      });
		}
}

export function signUp(data) {
    return (dispatch) => {
	    dispatch(beginSignUp());
		return axios.post('/signup', data)
			.then(response => {
		        dispatch(signUpSuccess(data.username, 'You have successfully registered an account!'));
		        dispatch(push('/'));
		    })
		    .catch((err) => {
		        dispatch(signUpError('Something went wrong when signing up'));
		    });
	};
}

export function logOut() {

	return (dispatch) => {

	    dispatch(beginLogout());

	    return axios.get('/logout')
	      .then((response) => {

	          dispatch(logoutSuccess());
				dispatch(push('/'));
	      })
	      .catch((err) => {

	        dispatch(logoutError());
	      });
	  };
}