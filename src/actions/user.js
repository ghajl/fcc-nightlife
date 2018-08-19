import { axiosInstance } from '../../config/app';
import actionTypes from './types';
import { getPersistor } from '../store';
import { addBar } from './bar';

function beginLogin() {
  return { type: actionTypes.MANUAL_LOGIN_USER };
}

function loginSuccess(username, bars, userId, message) {
  return {
    type: actionTypes.LOGIN_SUCCESS_USER,
    message,
    username,
    bars,
    userId,
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

function signUpSuccess(username, userId, message) {
  return {
    type: actionTypes.SIGNUP_SUCCESS_USER,
    message,
    username,
    userId,
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
    return axiosInstance.post('/login', data)
      .then((response) => {
        dispatch(loginSuccess(data.username, response.data.bars, response.data.userId, 'You have been successfully logged in!'));
        // add user to users list of bar if user came here from add button on place card
        if (getState().reducer.guestBar) {
          const barId = getState().reducer.guestBar;
          const fromLogin = true;
          addBar(barId, fromLogin);
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
        dispatch(signUpSuccess(data.username, response.data.userId, 'You have successfully registered an account!'));
        // add user to users list in Place if user came here from add button on place card
        if (getState().reducer.guestBar) {
          const barId = getState().reducer.guestBar;
          const fromSignup = true;
          addBar(barId, fromSignup);
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

function saveGuestBar(barId) {
  return {
    type: actionTypes.SAVE_GUEST_BAR,
    barId,
  };
}

export function loginAndAdd(barId) {
  return (dispatch) => {
    dispatch(saveGuestBar(barId));
    dispatch(toLogIn());
  };
}

function beginFetchUserData() {
  return { type: actionTypes.FETCH_USER };
}

function beginShowBasket() {
  return { type: actionTypes.BEGIN_SHOW_BASKET };
}

function fetchUserDataSuccess(username, profile, userId, bars) {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    username,
    profile,
    userId,
    bars,
  };
}

function fetchUserDataError() {
  return { type: actionTypes.FETCH_USER_ERROR };
}

export default function fetchUserData() {
  return (dispatch) => {
    dispatch(beginFetchUserData());
    return axiosInstance.get('/currentUser')
      .then((response) => {
        const {
          username, profile, userId, bars,
        } = response.data;
        dispatch(fetchUserDataSuccess(username, profile, userId, bars));
      })
      .catch(() => {
        dispatch(fetchUserDataError());
      });
  };
}

async function getBarDetails(service, barId) {
  return new Promise((resolve) => {
    const request = {
      placeId: barId,
      fields: ['name', 'vicinity'],
    };
    service.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        resolve(place);
      } else {
        resolve({});
      }
    });
  });
}

function showBasketSuccess(basketList) {
  return {
    type: actionTypes.SHOW_BASKET_SUCCESS,
    basketList,
  };
}

function showBasketError(message) {
  return {
    type: actionTypes.SHOW_BASKET_ERROR,
    message,
  };
}

export function closeBasket() {
  return { type: actionTypes.CLOSE_BASKET };
}
export function showBasket(service) {
  return (dispatch) => {
    dispatch(beginShowBasket());
    return axiosInstance.get('/currentUserBasket')
      .then(async (response) => {
        const { currentUserBars: bars } = response.data;
        const basketList = [];
        await bars.reduce((p, bar) => p.then(async () => {
          const barDetails = await getBarDetails(service, bar.placeId);
          const item = {
            barId: bar.barId,
            placeId: bar.placeId,
            name: barDetails.name,
            address: barDetails.vicinity,
          };
          basketList.push(item);
        }), Promise.resolve());
        dispatch(showBasketSuccess(basketList));
      })
      .catch(() => {
        dispatch(showBasketError('Your request could not be completed'));
      });
  };
}
