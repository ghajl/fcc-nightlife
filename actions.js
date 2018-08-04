import { push, replace } from 'react-router-redux';
import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { getPersistor } from './store';
import { apiEndpoint } from './config/app';

const axiosInstance = axios.create({
  baseURL: apiEndpoint,
  headers: { 'cache-control': 'no-cache' },
});


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
  ADD_TO_VISITORS_LIST: 'ADD_TO_VISITORS_LIST',
  ADD_TO_VISITORS_LIST_SUCCESS: 'ADD_TO_VISITORS_LIST_SUCCESS',
  MODIFY_VISITORS_LIST_ERROR: 'MODIFY_VISITORS_LIST_ERROR',
  REMOVE_FROM_VISITORS_LIST: 'REMOVE_FROM_VISITORS_LIST',
  REMOVE_FROM_VISITORS_LIST_SUCCESS: 'REMOVE_FROM_VISITORS_LIST_SUCCESS',
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
  BEGIN_SHOW_VISITORS_LIST: 'BEGIN_SHOW_VISITORS_LIST',
  SHOW_VISITORS_LIST_SUCCESS: 'SHOW_VISITORS_LIST_SUCCESS',
  SHOW_VISITORS_LIST_ERROR: 'SHOW_VISITORS_LIST_ERROR',
  CLOSE_VISITORS_LIST: 'CLOSE_VISITORS_LIST',
  INCREMENT_VISITORS_COUNT: 'INCREMENT_VISITORS_COUNT',
  DECREMENT_VISITORS_COUNT: 'DECREMENT_VISITORS_COUNT',
  ADD_BAR_TO_USER: 'ADD_BAR_TO_USER',
  REMOVE_BAR_FROM_USER: 'REMOVE_BAR_FROM_USER',
};

function showMessage(message) {
  return {
    type: actionTypes.SHOW_MESSAGE_DIALOG,
    message,
  };
}

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

function beginAddToVisitorsList() {
  return { type: actionTypes.ADD_TO_VISITORS_LIST };
}

function incrementVisitorsCount(placeID) {
  return {
    type: actionTypes.INCREMENT_VISITORS_COUNT,
    placeID,
  };
}

function addBarToUser(placeID) {
  return {
    type: actionTypes.ADD_BAR_TO_USER,
    placeID,
  };
}

function addToVisitorsListSuccess(placeID, message) {
  return (dispatch, getState) => {
    const { userBars } = getState().reducer.user;
    if (userBars.indexOf(placeID) === -1) {
      dispatch(incrementVisitorsCount(placeID));
      dispatch(addBarToUser(placeID));
      dispatch(showMessage(message));
    }
    dispatch({ type: actionTypes.ADD_TO_VISITORS_LIST_SUCCESS });
  };
}

function modifyVisitorsListError(message) {
  return {
    type: actionTypes.MODIFY_VISITORS_LIST_ERROR,
    message,
  };
}

function decrementVisitorsCount(placeID) {
  return {
    type: actionTypes.DECREMENT_VISITORS_COUNT,
    placeID,
  };
}

function removeBarFromUser(placeID) {
  return {
    type: actionTypes.REMOVE_BAR_FROM_USER,
    placeID,
  };
}

function removeFromVisitorsListSuccess(placeID, message) {
  return (dispatch, getState) => {
    const { userBars } = getState().reducer.user;
    if (userBars.indexOf(placeID) !== -1) {
      dispatch(decrementVisitorsCount(placeID));
      dispatch(removeBarFromUser(placeID));
      dispatch(showMessage(message));
    }
    dispatch({ type: actionTypes.REMOVE_FROM_VISITORS_LIST_SUCCESS });
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
function beginShowVisitorsList() {
  return { type: actionTypes.BEGIN_SHOW_VISITORS_LIST };
}
function showVisitorsListSuccess(users) {
  return {
    type: actionTypes.SHOW_VISITORS_LIST_SUCCESS,
    users,
  };
}
function showVisitorsListError(message) {
  return {
    type: actionTypes.SHOW_VISITORS_LIST_ERROR,
    message,
  };
}

function modifyVisitorsList(placeID, userID, operation, dispatch, fromLogin = false) {
  const data = { placeID, userID, operation };
  const successMessage = operation === 'ADD'
    ? 'You have successfully added to the list!'
    : 'You have successfully removed from the list!';
  const successAction = operation === 'ADD'
    ? addToVisitorsListSuccess(data.placeID, successMessage)
    : removeFromVisitorsListSuccess(data.placeID, successMessage);
  dispatch(beginAddToVisitorsList());
  return axiosInstance.post('/places', data)
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
          dispatch(modifyVisitorsListError('You are not logged in'));
        }
        if (err.response.status === '403') {
          dispatch(modifyVisitorsListError('You are logged in to another account'));
        }
      }
      dispatch(modifyVisitorsListError('Your request could not be completed'));
    });
}

export function manualLogin(data) {
  return (dispatch, getState) => {
    dispatch(beginLogin());
    const places = getState().reducer.user.locationBars != null
      ? getState().reducer.user.locationBars.map(bar => bar.id)
      : [];
    const loginData = { ...data, ...{ places } };
    return axiosInstance.post('/login', loginData)
      .then((response) => {
        dispatch(loginSuccess(data.username, response.data.places, response.data.userID, 'You have been successfully logged in!'));
        // add user to users list of bar if user came here from add button on place card
        if (getState().reducer.user.guestBar) {
          const placeID = getState().reducer.user.guestBar;
          const { userID } = response.data;
          const operation = 'ADD';
          const fromLogin = true;
          modifyVisitorsList(placeID, userID, operation, dispatch, fromLogin);
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
        if (getState().reducer.user.guestBar) {
          const placeID = getState().reducer.user.guestBar;
          const { userID } = response.data;
          const operation = 'ADD';
          const fromSignup = true;
          modifyVisitorsList(placeID, userID, operation, dispatch, fromSignup);
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

export function returnFromLogIn() {
  return (dispatch, getState) => {
    const path = getState().reducer.user.returnPath;
    dispatch(push(path));
  };
}

export function saveReturnTo(path) {
  return {
    type: actionTypes.SAVE_PATH,
    path,
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
            return axiosInstance.get('/data', {
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
                    dispatch(modifyVisitorsListError('You are not logged in'));
                  }
                  if (err.response.status === '403') {
                    dispatch(modifyVisitorsListError('You are logged in to another account'));
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
    return axiosInstance.get('/user')
      .then((response) => {
        const { username, profile, userID } = response.data;
        dispatch(fetchUserDataSuccess(username, profile, userID));
      })
      .catch(() => {
        dispatch(fetchUserDataError());
      });
  };
}

export function showVisitorsList(placeID) {
  return (dispatch) => {
    dispatch(beginShowVisitorsList());
    return axiosInstance.get('/userslist', { params: { placeID } })
      .then((response) => {
        dispatch(showVisitorsListSuccess(response.data.users));
      })
      .catch(() => {
        dispatch(showVisitorsListError('Unable to perform requested operation'));
      });
  };
}

export function closeVisitorsList() {
  return { type: actionTypes.CLOSE_VISITORS_LIST };
}

export function addToVisitorsList(placeID) {
  return (dispatch, getState) => {
    const { userID } = getState().reducer.user;
    const operation = 'ADD';
    modifyVisitorsList(placeID, userID, operation, dispatch);
  };
}

export function removeFromVisitorsList(placeID) {
  return (dispatch, getState) => {
    const { userID } = getState().reducer.user;
    const operation = 'REMOVE';
    modifyVisitorsList(placeID, userID, operation, dispatch);
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
