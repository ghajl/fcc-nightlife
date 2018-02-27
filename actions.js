import { push, replace } from 'react-router-redux';
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
	FIND_LOCATION: 'FIND_LOCATION',
	FIND_LOCATION_SUCCESS: 'FIND_LOCATION_SUCCESS',
	FIND_LOCATION_ERROR: 'FIND_LOCATION_ERROR',
	FIND_PLACES: 'FIND_PLACES',
	FIND_PLACES_SUCCESS: 'FIND_PLACES_SUCCESS',
	FIND_PLACES_ERROR: 'FIND_PLACES_ERROR',
	ADD_TO_LIST: 'ADD_TO_LIST',
	ADD_TO_LIST_SUCCESS: 'ADD_TO_LIST_SUCCESS',
	ADD_TO_LIST_ERROR: 'ADD_TO_LIST_ERROR',
	REMOVE_FROM_LIST: 'REMOVE_FROM_LIST',
	REMOVE_FROM_LIST_SUCCESS: 'REMOVE_FROM_LIST_SUCCESS',
	REMOVE_FROM_LIST_ERROR: 'REMOVE_FROM_LIST_ERROR',
	SAVE_PATH: 'SAVE_PATH',
	SAVE_GUEST_BAR: 'SAVE_GUEST_BAR',
	OPEN_LOGIN_DIALOG: 'OPEN_LOGIN_DIALOG',
	CLOSE_LOGIN_DIALOG: 'CLOSE_LOGIN_DIALOG',
	SHOW_MESSAGE_DIALOG: 'SHOW_MESSAGE_DIALOG',
	CLOSE_MESSAGE_DIALOG: 'CLOSE_MESSAGE_DIALOG',
	OPEN_LOGIN_MENU: 'OPEN_LOGIN_MENU',
	CLOSE_LOGIN_MENU: 'CLOSE_LOGIN_MENU',
	HIGHLIGHT_PLACE: 'HIGHLIGHT_PLACE',
	FOOTER_HEIGHT: 'FOOTER_HEIGHT',
	HEADER_HEIGHT: 'HEADER_HEIGHT'
}


function beginLogin() {
  return { type: actionTypes.MANUAL_LOGIN_USER };
}

function loginSuccess(username, places, message) {
  return {
    type: actionTypes.LOGIN_SUCCESS_USER,
    message,
    username,
    places
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

function signUpSuccess(username, places, message) {
  return {
    type: actionTypes.SIGNUP_SUCCESS_USER,
    message,
    username,
    places
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

function beginLocationSearch() {
	return { type: actionTypes.FIND_LOCATION };
}

function searchLocationSuccess(address, lat, lng) {
	return { type: actionTypes.FIND_LOCATION_SUCCESS,
			location: address,
			lat,
			lng
		 };
}

function searchLocationError(message) {
	return { type: actionTypes.FIND_LOCATION_ERROR,
			message
		 };
}

function beginPlacesSearch() {
	return { type: actionTypes.FIND_PLACES };
}

function searchPlacesSuccess(data, address, lat, lng) {
	return { type: actionTypes.FIND_PLACES_SUCCESS,
			data, 
			address, 
			lat, 
			lng
		 };
}

function searchPlacesError(message) {
	return { type: actionTypes.FIND_PLACES_ERROR,
			message
		 };
}

function beginAddToList() {
	return { type: actionTypes.ADD_TO_LIST };
}

function addToListSuccess(placeID, message) {
	return { type: actionTypes.ADD_TO_LIST_SUCCESS,
			placeID,
			message
		 };
}

function addToListError(message) {
	return { type: actionTypes.ADD_TO_LIST_ERROR,
			message
		 };
}

function beginRemoveFromList() {
	return { type: actionTypes.REMOVE_FROM_LIST };
}

function removeFromListSuccess(placeID, message) {
	console.log(placeID)
	return { type: actionTypes.REMOVE_FROM_LIST_SUCCESS,
			placeID,
			message
		 };
}

function removeFromListError(message) {
	return { type: actionTypes.REMOVE_FROM_LIST_ERROR,
			message
		 };
}

function saveCurrentPath(path) {
	return {
	    type: actionTypes.SAVE_PATH,
	    path
    };
}

function saveGuestBar(placeID) {
	return {
	    type: actionTypes.SAVE_GUEST_BAR,
	    placeID
    };
}

function showMessage(message) {
	return {
	    type: actionTypes.SHOW_MESSAGE_DIALOG,
	    message
    };
}

export function closeMessage() {
	return { type: actionTypes.CLOSE_MESSAGE_DIALOG
		 };
}

export function openLoginDialog() {
	return { type: actionTypes.OPEN_LOGIN_DIALOG
		 };
}

export function closeLoginDialog() {
	return { type: actionTypes.CLOSE_LOGIN_DIALOG
		 };
}

export function openLoginMenu() {
	return { type: actionTypes.OPEN_LOGIN_MENU
		 };
}

export function closeLoginMenu() {
	return { type: actionTypes.CLOSE_LOGIN_MENU
		 };
}

export function manualLogin(data) {

	return (dispatch, getState) => {
		dispatch(beginLogin());

		return axios.post('/login', data)
			 .then((response) => {
			 		dispatch(loginSuccess(data.username, response.data.places, 'You have been successfully logged in!'));

		            //add user to users list in Place if user came here from add button on place cart
		            if(getState().reducer.user.guestBar){
		            	const addData = {
				        	placeID: getState().reducer.user.guestBar,
				        	username: data.username,
				        	operation: 'ADD'
				        }
		            	dispatch(beginAddToList());
					    
						return axios.post('/places', addData)
							.then(response => {
								dispatch(addToListSuccess(addData.placeID, 'You have successfully added to the list!'));
						        
						    })
						    .catch((err) => {
						        dispatch(addToListError("Add to the bar request could not be completed"));
						    });
		            } 
		            
		      })
		      .catch((err) => {
		        dispatch(loginError('Invalid username or password'));
		      });
		}
}

export function signUp(data) {
    return (dispatch, getState) => {
    	const path = getState().reducer.user.signupReturnPath;
    	dispatch(beginSignUp());
		return axios.post('/signup', data)
			.then(response => {
				dispatch(signUpSuccess(data.username, [], 'You have successfully registered an account!'));
					//add user to users list in Place if user came here from add button on place cart
		            if(getState().reducer.user.guestBar){
		            	const addData = {
				        	placeID: getState().reducer.user.guestBar,
				        	username: data.username,
				        	operation: 'ADD'
				        }
		            	dispatch(beginAddToList());
					    
						return axios.post('/places', addData)
							.then(response => {
								dispatch(addToListSuccess(addData.placeID, 'You have successfully added to the list!'));
						        dispatch(push(path));

						    })
						    .catch((err) => {
						        dispatch(addToListError("Add to the bar request could not be completed"));
						    });
		            } else {
		            	
		            	dispatch(push(path));
		            }


		       
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
	      		getPersistor().purge();
	            dispatch(logoutSuccess());
				
	      })
	      .catch((err) => {

	        dispatch(logoutError());
	      });
	  };
}

export function findLocation(address) {
	return (dispatch) => {

	    dispatch(beginLocationSearch());

	    return geocodeByAddress(address)
		    .then(results => getLatLng(results[0]))
		    .then(({ lat, lng }) => {
		    				dispatch(searchLocationSuccess(address, lat, lng))
		    			})
		    .catch((err) => {
		        dispatch(searchLocationError("Your request could not be completed, something wrong with the address"));
            })
	}
}

export function showPlaces(service, address) {
	return (dispatch, getState) => {

		dispatch(beginPlacesSearch());

	    return geocodeByAddress(address)
		    .then(results => getLatLng(results[0]))
		    .then(({ lat, lng }) => {
		    				
		    				const {username} = getState().reducer.user;
		    				const loc = new google.maps.LatLng(lat,lng);
							const request = {
					                    location: loc,
									    radius: '3000',
									    type: ['bar'],
				                    };
							
					        service.nearbySearch(request, (results, status, pagination) => {
									if (status == google.maps.places.PlacesServiceStatus.OK) {
										return axios.get('/data', {
														    params: {
														        bars: results.map(item=>item.id)
														    }
														}).then(response => {
															let res = results.map(item => {
																let photoUrl = item.photos && item.photos[0] && item.photos[0].getUrl && item.photos[0].getUrl instanceof Function && item.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});
																return {id: item.id, 
																		name: item.name,
																		photoUrl, 
																		rating: item.rating,
																		location: item.geometry.location, 
																		address: item.vicinity, 
																		users:[],
																		highlighted: false}
																	});
																  response.data.places.forEach(item => {
																			for(let i in res){
																				if(item.placeID === res[i].id){
																		
																					res[i].users = item.users.slice(0);
																					break;
																				}
																			}
																		})
															dispatch(searchPlacesSuccess(res, address, lat, lng));
															
														}

														).catch((err) => {
													        dispatch(searchPlacesError("Unable to show results"));
													    });
									    
									} else {
									  	dispatch(searchPlacesError("Unable to show results"));
									}});        

		    			})
		    .catch((err) => {
		        dispatch(searchPlacesError("Unable to show results"));
            })
		
	}
}

export function addToList(data) {

    return (dispatch) => {
    	const addData = {...data, ...{ operation: 'ADD' }};
	    dispatch(beginAddToList());
	    
		return axios.post('/places', addData)
			.then(response => {

		        dispatch(addToListSuccess(data.placeID, 'You have successfully added to the list!'));
		    })
		    .catch((err) => {
		        dispatch(addToListError('Add to the bar request could not be completed'));
		    });
	};
}

export function removeFromList(data) {

    return (dispatch) => {
    	const removeData = {...data, ...{ operation: 'REMOVE' }};
	    dispatch(beginRemoveFromList());
		return axios.post('/places', removeData)
			.then(response => {
				dispatch(removeFromListSuccess(data.placeID, 'You have successfully removed from the list!'));
		    })
		    .catch((err) => {
		        dispatch(removeFromListError('Remove from the bar request could not be completed'));
		    });
	};
}

export function toLogIn() {
	return (dispatch) => {
		dispatch(openLoginDialog());
	}
}

export function toSignUp(path) {
	return (dispatch) => {
		dispatch(saveCurrentPath(path.pathname+path.search));
		dispatch(push("/signup"));
	}
}

export function loginAndAdd(placeID) {
	return (dispatch) => {
		dispatch(saveGuestBar(placeID));
		dispatch(toLogIn());
	}
}

//sets url for home page
export function setLocation(address, pathname){
	return (dispatch) => {
		dispatch(push(`${pathname}?loc=${address}`));
		
	}
}

export function replaceLocation(address, pathname){
	return (dispatch) => {
		dispatch(replace(`${pathname}?loc=${address}`));
		
	}
}

//sets url for page that shows list of bars 
export function setPlacesLocation(address){
	return (dispatch) => {
		dispatch(push(`/places?loc=${address}&bar=show`));
		
	}
}


export function highlightPlace(placeID) {
	return { type: actionTypes.HIGHLIGHT_PLACE,
		placeID
		 };
}

export function footerHeight(height) {
	console.log(height)
	return { type: actionTypes.FOOTER_HEIGHT,
		height
		 };
}

export function headerHeight(height) {
	return { type: actionTypes.HEADER_HEIGHT,
		height
		 };
}