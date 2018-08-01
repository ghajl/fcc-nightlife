import { push, replace } from 'react-router-redux';
import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { getPersistor } from './store';

export const actionTypes = {
  MANUAL_LOGIN_USER: 'MANUAL_LOGIN_USER',
  LOGIN_SUCCESS_USER: 'LOGIN_SUCCESS_USER',
  LOGIN_ERROR_USER: 'LOGIN_ERROR_USER',
  FETCH_USER: 'FETCH_USER',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR: 'FETCH_USER_ERROR',
  SIGNUP_USER: 'SIGNUP_USER',
  SIGNUP_SUCCESS_USER: 'SIGNUP_SUCCESS_USER',
  SIGNUP_ERROR_USER: 'SIGNUP_ERROR_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  LOGOUT_SUCCESS_USER: 'LOGOUT_SUCCESS_USER',
  LOGOUT_ERROR_USER: 'LOGOUT_ERROR_USER',
  FIND_LOCATION: 'FIND_LOCATION',
  FIND_LOCATION_SUCCESS: 'FIND_LOCATION_SUCCESS',
  FIND_LOCATION_ERROR: 'FIND_LOCATION_ERROR',
  FIND_PLACES: 'FIND_PLACES',
  FIND_PLACES_SUCCESS: 'FIND_PLACES_SUCCESS',
  FIND_PLACES_ERROR: 'FIND_PLACES_ERROR',
  ADD_TO_LIST: 'ADD_TO_LIST',
  ADD_TO_LIST_SUCCESS: 'ADD_TO_LIST_SUCCESS',
  MODIFY_LIST_ERROR: 'MODIFY_LIST_ERROR',
  REMOVE_FROM_LIST: 'REMOVE_FROM_LIST',
  REMOVE_FROM_LIST_SUCCESS: 'REMOVE_FROM_LIST_SUCCESS',
  SAVE_PATH: 'SAVE_PATH',
  SAVE_GUEST_BAR: 'SAVE_GUEST_BAR',
  OPEN_LOGIN_DIALOG: 'OPEN_LOGIN_DIALOG',
  CLOSE_LOGIN_DIALOG: 'CLOSE_LOGIN_DIALOG',
  SHOW_MESSAGE_DIALOG: 'SHOW_MESSAGE_DIALOG',
  CLOSE_MESSAGE_DIALOG: 'CLOSE_MESSAGE_DIALOG',
  OPEN_LOGIN_MENU: 'OPEN_LOGIN_MENU',
  CLOSE_LOGIN_MENU: 'CLOSE_LOGIN_MENU',
  HIGHLIGHT_PLACE: 'HIGHLIGHT_PLACE',
  START_FACEBOOK_LOGIN: 'START_FACEBOOK_LOGIN',
  END_FACEBOOK_LOGIN: 'END_FACEBOOK_LOGIN',
  BEGIN_SHOW_LIST: 'BEGIN_SHOW_LIST',
  SHOW_LIST_SUCCESS: 'SHOW_LIST_SUCCESS',
  SHOW_LIST_ERROR: 'SHOW_LIST_ERROR',
  CLOSE_USERS_LIST: 'CLOSE_USERS_LIST',
};

function beginFetchUserData() {
  return { type: actionTypes.FETCH_USER };
}

function fetchUserDataSuccess(username, profile, userID) {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    username,
    profile,
    userID,
  };
}

function fetchUserDataError() {
  return { type: actionTypes.FETCH_USER_ERROR };
}

function beginLogin() {
  return { type: actionTypes.MANUAL_LOGIN_USER };
}

function loginSuccess(username, places, userID, message) {
  return {
    type: actionTypes.LOGIN_SUCCESS_USER,
    message,
    username,
    places,
    userID,
  };
}

function loginError(message) {
  return {
    type: actionTypes.LOGIN_ERROR_USER,
    message,
  };
}

function signUpError(message) {
  return {
    type: actionTypes.SIGNUP_ERROR_USER,
    message,
  };
}

function beginSignUp() {
  return { type: actionTypes.SIGNUP_USER };
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

function beginLocationSearch() {
  return { type: actionTypes.FIND_LOCATION };
}

function searchLocationSuccess(address, lat, lng) {
  return {
    type: actionTypes.FIND_LOCATION_SUCCESS,
    location: address,
    lat,
    lng,
  };
}

function searchLocationError(message) {
  return {
    type: actionTypes.FIND_LOCATION_ERROR,
    message,
  };
}

function beginPlacesSearch() {
  return { type: actionTypes.FIND_PLACES };
}

function searchPlacesSuccess(data, address, lat, lng, userBars, username, profile, userID) {
  return {
    type: actionTypes.FIND_PLACES_SUCCESS,
    data,
    address,
    lat,
    lng,
    userBars,
    username,
    profile,
    userID,
  };
}

function searchPlacesError(message) {
  return {
    type: actionTypes.FIND_PLACES_ERROR,
    message,
  };
}

function beginAddToList() {
  return { type: actionTypes.ADD_TO_LIST };
}

function addToListSuccess(placeID, message) {
  return {
    type: actionTypes.ADD_TO_LIST_SUCCESS,
    placeID,
    message,
  };
}

function modifyListError(message) {
  return {
    type: actionTypes.MODIFY_LIST_ERROR,
    message,
  };
}

function removeFromListSuccess(placeID, message) {

  return {
    type: actionTypes.REMOVE_FROM_LIST_SUCCESS,
    placeID,
    message,
  };
}


function saveCurrentPath(path) {
  return {
    type: actionTypes.SAVE_PATH,
    path,
  };
}

function saveGuestBar(placeID) {
  return {
    type: actionTypes.SAVE_GUEST_BAR,
    placeID,
  };
}

function showMessage(message) {
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

export function startFacebookLogin() {
  return { type: actionTypes.START_FACEBOOK_LOGIN };
}

export function endFacebookLogin() {
  return { type: actionTypes.END_FACEBOOK_LOGIN };
}
function beginShowList() {
  return { type: actionTypes.BEGIN_SHOW_LIST };
}
function showListSuccess(users) {
  return {
    type: actionTypes.SHOW_LIST_SUCCESS,
    users,
  };
}
function showListError(message) {
  return {
    type: actionTypes.SHOW_LIST_ERROR,
    message,
  };
}

function modifyList(placeID, userID, operation, dispatch, fromLogin = false) {
  const data = { placeID, userID, operation };
  const successMessage = operation === 'ADD'
    ? 'You have successfully added to the list!'
    : 'You have successfully removed from the list!';
  const successAction = operation === 'ADD'
    ? addToListSuccess(data.placeID, successMessage)
    : removeFromListSuccess(data.placeID, successMessage);
  dispatch(beginAddToList());
  return axios.post('/places', data)
    .then(() => {
      dispatch(successAction);
      if (fromLogin) {
        dispatch(push('/return-from-success-login'));
      }
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === '401') {
          dispatch(logoutSuccess());
          dispatch(modifyListError('You are not logged in'));
        }
        if (err.response.status === '403') {
          dispatch(modifyListError('You are logged in to another account'));
        }
      }
      dispatch(modifyListError('Your request could not be completed'));
    });
}

export function manualLogin(data) {
  return (dispatch, getState) => {
    dispatch(beginLogin());
    const places = getState().reducer.user.locationBars != null
      ? getState().reducer.user.locationBars.map(bar => bar.id)
      : [];
    const loginData = { ...data, ...{ places } };
    return axios.post('/login', loginData)
      .then((response) => {
        dispatch(loginSuccess(data.username, response.data.places, response.data.userID, 'You have been successfully logged in!'));
        // add user to users list of bar if user came here from add button on place card
        if (getState().reducer.user.guestBar) {
          const placeID = getState().reducer.user.guestBar;
          const { userID } = response.data;
          const operation = 'ADD';
          const fromLogin = true;
          modifyList(placeID, userID, operation, dispatch, fromLogin);
        }
        dispatch(push('/return-from-success-login'));
      })
      .catch(() => {
        dispatch(loginError('Invalid username or password'));
      });
  };
}

export function signUp(data) {
  return (dispatch, getState) => {
    dispatch(beginSignUp());
    return axios.post('/signup', data)
      .then((response) => {
        dispatch(signUpSuccess(data.username, response.data.userID, 'You have successfully registered an account!'));
        // add user to users list in Place if user came here from add button on place card
        if (getState().reducer.user.guestBar) {
          const placeID = getState().reducer.user.guestBar;
          const { userID } = response.data;
          const operation = 'ADD';
          const fromSignup = true;
          modifyList(placeID, userID, operation, dispatch, fromSignup);
        }
        dispatch(push('/return-from-success-login'));
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

export function returnFromLogIn() {
  return (dispatch, getState) => {
    const path = getState().reducer.user.returnPath;
    dispatch(push(path));
  };
}

export function saveReturnTo(path) {
  return {
    type: actionTypes.SAVE_PATH,
    path: path.pathname + path.search,
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());
    return axios.get('/logout')
      .then(() => {
        getPersistor().purge();
        dispatch(logoutSuccess());
      })
      .catch(() => {
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
        dispatch(searchLocationSuccess(address, lat, lng));
      })
      .catch(() => {
        dispatch(searchLocationError('Your request could not be completed, something wrong with the address'));
      });
  };
}

export function showPlaces(service, address) {
  return (dispatch) => {
    dispatch(beginPlacesSearch());
    return geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        const loc = new google.maps.LatLng(lat, lng); // coordinates of location
        const request = {
          location: loc,
          radius: '3000',
          type: ['bar'],
        };
        // find bars in the location
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // get list of users registered in bars
            return axios.get('/data', {
              params: {
                bars: results.map(item => item.id),
              },
            })
              .then((response) => {
                // make list of bars
                const locationBars = results.map((item) => {
                  const photoUrl = item.photos && item.photos[0] && item.photos[0].getUrl && item.photos[0].getUrl instanceof Function && item.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});
                  return {
                    id: item.id,
                    name: item.name,
                    photoUrl,
                    rating: item.rating,
                    location: item.geometry.location,
                    address: item.vicinity,
                    users: 0,
                    highlighted: false,
                  };
                });
                // add number of users on the list
                response.data.placesUsersData.forEach((item) => {
                  const i = locationBars.findIndex(elem => elem.id === item.placeID);
                  locationBars[i].users = item.users;
                });
                const { username = null, profile = null, userID = null } = response.data;
                dispatch(searchPlacesSuccess(locationBars, address, lat, lng, response.data.currentUserBars, username, profile, userID));
              })
              .catch((err) => {
                if (err.response) {
                  if (err.response.status === '401') {
                    dispatch(logoutSuccess());
                    dispatch(modifyListError('You are not logged in'));
                  }
                  if (err.response.status === '403') {
                    dispatch(modifyListError('You are logged in to another account'));
                  }
                }
                dispatch(searchPlacesError('Unable to show results'));
              });
          }
          dispatch(searchPlacesError('Unable to show results'));
        });
      })
      .catch(() => {
        dispatch(searchPlacesError('Unable to show results'));
      });
  };
}

export function fetchUserData() {
  return (dispatch) => {
    dispatch(beginFetchUserData());
    return axios.get('/user')
      .then((response) => {
        const { username, profile, userID } = response.data;
        dispatch(fetchUserDataSuccess(username, profile, userID));
      })
      .catch(() => {
        dispatch(fetchUserDataError());
      });
  };
}

export function showList(placeID) {
  return (dispatch) => {
    dispatch(beginShowList());
    return axios.get('/userslist', { params: { placeID } })
      .then((response) => {
        dispatch(showListSuccess(response.data.users));
      })
      .catch(() => {
        dispatch(showListError('Unable to perform requested operation'));
      });
  };
}

export function closeList() {
  return { type: actionTypes.CLOSE_USERS_LIST };
}

export function addToList(placeID) {
  return (dispatch, getState) => {
    const { userID } = getState().reducer.user;
    const operation = 'ADD';
    modifyList(placeID, userID, operation, dispatch);
  };
}

export function removeFromList(placeID) {
  return (dispatch, getState) => {
    const { userID } = getState().reducer.user;
    const operation = 'REMOVE';
    modifyList(placeID, userID, operation, dispatch);
  };
}

export function toLogIn() {
  return { type: actionTypes.OPEN_LOGIN_DIALOG };
}

export function toSignUp() {
  return (dispatch) => {
    dispatch(push('/signup'));
  };
}

export function loginAndAdd(placeID) {
  return (dispatch) => {
    dispatch(saveGuestBar(placeID));
    dispatch(toLogIn());
  };
}

// sets url for home page
export function setLocation(address, pathname) {
  return (dispatch) => {
    dispatch(push(`${pathname}?loc=${address}`));
  };
}

export function replaceLocation(address, pathname) {
  return (dispatch) => {
    dispatch(replace(`${pathname}?loc=${address}`));
  };
}

// sets url for page that shows list of bars
export function setPlacesLocation(address) {
  return (dispatch) => {
    dispatch(push(`/places?loc=${address}&bar=show`));
  };
}


export function highlightPlace(placeID) {
  return {
    type: actionTypes.HIGHLIGHT_PLACE,
    placeID,
  };
}
