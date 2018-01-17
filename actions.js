import { push } from 'react-router-redux';
import axios from "axios";
import { getPersistor} from './store';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
	FIND_PLACES: 'FIND_PLACES',
	FIND_PLACES_SUCCESS: 'FIND_PLACES_SUCCESS',
	FIND_PLACES_ERROR: 'FIND_PLACES_ERROR',
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

function beginSearch() {
	return { type: actionTypes.FIND_PLACES };
}

function searchSuccess(address, lat, lng) {
	return { type: actionTypes.FIND_PLACES_SUCCESS,
			data: [],
			location: address,
			lat,
			lng
		 };
}

function searchError(message) {
	return { type: actionTypes.FIND_PLACES_ERROR,
			message
		 };
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

export function logOut(persistStore) {
	
	return (dispatch) => {

	    dispatch(beginLogout());

	    return axios.get('/logout')
	      .then((response) => {
	      		getPersistor().purge();
	            dispatch(logoutSuccess());
				dispatch(push('/'));
	      })
	      .catch((err) => {

	        dispatch(logoutError());
	      });
	  };
}

export function findPlace(address) {
	return (dispatch) => {

	    dispatch(beginSearch());

	    return geocodeByAddress(address)
		    .then(results => getLatLng(results[0]))
		    .then(({ lat, lng }) => {
		    				dispatch(searchSuccess(address, lat, lng))
		    			})
		    .catch((err) => {
		        dispatch(searchError("Something wrong with address"));
            })
	}
}

export function showPlaces(address, lat, lng, service) {
	return (dispatch) => {
		dispatch(beginSearch());
		const loc = new google.maps.LatLng(lat,lng);
		const request = {
                    location: loc,
				    radius: '1000',
                    type: ['bar'],
                    
                };
		
		service.nearbySearch(request, (results, status) => {
		  if (status == google.maps.places.PlacesServiceStatus.OK) {
		    for (var i = 0; i < results.length; i++) {
		    	console.log(results[i])
		      // var place = results[i];
		      // createMarker(results[i]);
		    }
		  } else {
		  	console.log(google.maps.places.PlacesServiceStatus)
		  }});
		dispatch(push('/places'));
	}
}