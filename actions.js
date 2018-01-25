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
	FIND_LOCATION: 'FIND_LOCATION',
	FIND_LOCATION_SUCCESS: 'FIND_LOCATION_SUCCESS',
	FIND_LOCATION_ERROR: 'FIND_LOCATION_ERROR',
	FIND_PLACES: 'FIND_PLACES',
	FIND_PLACES_SUCCESS: 'FIND_PLACES_SUCCESS',
	FIND_PLACES_ERROR: 'FIND_PLACES_ERROR',
	SET_MAP_HEIGHT: 'SET_MAP_HEIGHT',
	ADD_PLACE: 'ADD_PLACE',
	ADD_PLACE_SUCCESS: 'ADD_PLACE_SUCCESS',
	ADD_PLACE_ERROR: 'ADD_PLACE_ERROR',
	REMOVE_PLACE: 'REMOVE_PLACE',
	REMOVE_PLACE_SUCCESS: 'REMOVE_PLACE_SUCCESS',
	REMOVE_PLACE_ERROR: 'REMOVE_PLACE_ERROR',
	SAVE_PATH: 'SAVE_PATH',
	SAVE_GUEST_BAR: 'SAVE_GUEST_BAR',
	OPEN_LOGIN: 'OPEN_LOGIN',
	CLOSE_LOGIN: 'CLOSE_LOGIN'
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

function searchPlacesSuccess(data) {
	return { type: actionTypes.FIND_PLACES_SUCCESS,
			data
		 };
}

function searchPlacesError(message) {
	return { type: actionTypes.FIND_PLACES_ERROR,
			message
		 };
}

function beginAddPlace() {
	return { type: actionTypes.ADD_PLACE };
}

function addPlaceSuccess(placeID, message) {
	console.log(placeID)
	return { type: actionTypes.ADD_PLACE_SUCCESS,
			placeID,
			message
		 };
}

function addPlaceError(message) {
	return { type: actionTypes.ADD_PLACE_ERROR,
			message
		 };
}

function beginRemovePlace() {
	return { type: actionTypes.REMOVE_PLACE };
}

function removePlaceSuccess(placeID, message) {
	console.log(placeID)
	return { type: actionTypes.REMOVE_PLACE_SUCCESS,
			placeID,
			message
		 };
}

function removePlaceError(message) {
	return { type: actionTypes.REMOVE_PLACE_ERROR,
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

export function setHeight(data) {
	return { type: actionTypes.SET_MAP_HEIGHT,
			data
		 };
}

export function openLoginDialog() {
	console.log("open")
	return { type: actionTypes.OPEN_LOGIN
		 };
}

export function closeLoginDialog() {
	return { type: actionTypes.CLOSE_LOGIN
		 };
}
// export function loginAndAdd(userData, placeID){
// 	if(!placeID) {
// 		manualLogin(userData)
// 	} else {

// 	}
// }

export function manualLogin(data) {

	return (dispatch, getState) => {
		// const path = getState().reducer.user.loginReturnPath;
		console.log("22")
		console.log(getState())
		dispatch(beginLogin());

		return axios.post('/login', data)
			 .then((response) => {
			 		// console.log(response)
		            dispatch(loginSuccess(data.username, response.data.places, 'You have been successfully logged in'));
		            //user came here from add button
		            if(getState().reducer.user.guestBar){
		            	const addData = {
				        	placeID: getState().reducer.user.guestBar,
				        	username: data.username,
				        	operation: 'ADD'
				        }
		            	dispatch(beginAddPlace());
					    
						return axios.post('/places', addData)
							.then(response => {
								dispatch(addPlaceSuccess(addData.placeID, 'You have successfully registered an account!'));
						        dispatch(push(path));
						    })
						    .catch((err) => {
						        dispatch(addPlaceError("Error while adding the bar"));
						    });
		            } else {
		            	// dispatch(push(path));
		            }
		            
		      })
		      .catch((err) => {
		        dispatch(loginError('Invalid username or password'));
		      });
		}
}

export function signUp(data) {
    return (dispatch, getState) => {
    	const path = getState().reducer.user.loginReturnPath;
    	console.log(getState())
	    dispatch(beginSignUp());
		return axios.post('/signup', data)
			.then(response => {
				// console.log(response)
		        dispatch(signUpSuccess(data.username, [], 'You have successfully registered an account!'));
		        dispatch(push(path));
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
				// dispatch(push('/'));
	      })
	      .catch((err) => {

	        dispatch(logoutError());
	      });
	  };
}

export function findPlace(address) {
	return (dispatch) => {

	    dispatch(beginLocationSearch());

	    return geocodeByAddress(address)
		    .then(results => getLatLng(results[0]))
		    .then(({ lat, lng }) => {
		    				dispatch(searchLocationSuccess(address, lat, lng))
		    			})
		    .catch((err) => {
		        dispatch(searchLocationError("Something wrong with address"));
            })
	}
}

export function showPlaces(service) {
	return (dispatch, getState) => {
		dispatch(beginPlacesSearch());
		const {lat, lng, location, username} = getState().reducer.user;
		// const { lat, lng, location } = getState().user;
		// console.log(location)
		const loc = new google.maps.LatLng(lat,lng);
		const request = {
                    location: loc,
				    radius: '3000',
				    type: ['bar'],
                    // keyword: ['bar'],
                    // rankBy: google.maps.places.RankBy.DISTANCE,
                };
		
		service.nearbySearch(request, (results, status, pagination) => {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				// console.log(results.map(item=>item.id))
				return axios.get('/data', {
								    params: {
								        bars: results.map(item=>item.id)
								    }
								}).then(response => {
									console.log(results);
									let res = results.map(item => {
										let photoUrl = item.photos && item.photos[0] && item.photos[0].getUrl && item.photos[0].getUrl instanceof Function && item.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});
										return {id: item.id, 
												name: item.name,
												photoUrl, 
												rating: item.rating,
												location: item.geometry.location, 
												address: item.vicinity, 
												users:[]}
											});
									// let x = results[0].reference;
									// return axios.get('/photo', {
									// 	params: {
									// 		ref: x
									// 	}
									// }).then(res => {
									// 	  // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
										  response.data.places.forEach(item => {
									// 	// console.log(item);
													for(let i in res){
														// console.log(i);
														if(item.placeID === res[i].id){
															// console.log("response");
												
															res[i].users = item.users.slice(0);
															break;
														}
													}
												})
									// 			// console.log(res);
												
									// 	});
									dispatch(searchPlacesSuccess(res));
											    dispatch(push('/places'));
									
								}

								).catch((err) => {
							        dispatch(searchPlacesError("Can't show results"));
							    });
			    
			} else {
			  	dispatch(searchPlacesError("Can't show results"));
			}});
		
	}
}

export function addPlace(data) {

    return (dispatch) => {
    	const addData = {...data, ...{ operation: 'ADD' }};
	    dispatch(beginAddPlace());
	    
		return axios.post('/places', addData)
			.then(response => {
				// console.log(data);

		        dispatch(addPlaceSuccess(data.placeID, 'You have successfully registered an account!'));
		        // dispatch(push('/'));
		    })
		    .catch((err) => {
		        dispatch(addPlaceError('Something went wrong when signing up'));
		    });
	};
}

export function removePlace(data) {

    return (dispatch) => {
    	const removeData = {...data, ...{ operation: 'REMOVE' }};
	    dispatch(beginRemovePlace());
		return axios.post('/places', removeData)
			.then(response => {
				// console.log(data);

		        dispatch(removePlaceSuccess(data.placeID, 'You have successfully registered an account!'));
		        // dispatch(push('/'));
		    })
		    .catch((err) => {
		        dispatch(removePlaceError('Something went wrong when signing up'));
		    });
	};
}

export function toLogIn(path) {
	return (dispatch) => {
		// console.log("sav")
		dispatch(saveCurrentPath(path));
		dispatch(push("/login"));
	}
}

export function toSignUp(path) {
	return (dispatch) => {
		// console.log("sav")
		dispatch(saveCurrentPath(path));
		dispatch(push("/signup"));
	}
}

export function loginAndAdd(path, placeID) {
	return (dispatch) => {
		// console.log("sav")
		dispatch(saveGuestBar(placeID));
		dispatch(toLogIn(path));
	}
}