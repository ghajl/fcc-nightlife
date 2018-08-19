import { combineReducers } from 'redux';
import actionTypes from '../actions/types';

const isWaiting = (
  state = 0,
  action,
) => {
  switch (action.type) {
  case actionTypes.BEGIN_ADD_BAR:
  case actionTypes.BEGIN_REMOVE_BAR:
  case actionTypes.FIND_LOCATION:
  case actionTypes.FIND_BARS:
  case actionTypes.LOGOUT_USER:
  case actionTypes.SIGNUP_USER:
  case actionTypes.FETCH_USER:
  case actionTypes.MANUAL_LOGIN_USER:
  case actionTypes.BEGIN_SHOW_VISITORS_LIST:
  case actionTypes.START_FACEBOOK_LOGIN:
  case actionTypes.BEGIN_SHOW_BASKET:
    return true;
  case actionTypes.LOGIN_SUCCESS_USER:
  case actionTypes.SIGNUP_SUCCESS_USER:
  case actionTypes.SIGNUP_ERROR_USER:
  case actionTypes.LOGIN_ERROR_USER:
  case actionTypes.LOGOUT_ERROR_USER:
  case actionTypes.LOGOUT_SUCCESS_USER:
  case actionTypes.SESSION_EXPIRED:
  case actionTypes.FETCH_USER_SUCCESS:
  case actionTypes.FETCH_USER_ERROR:
  case actionTypes.FIND_LOCATION_SUCCESS:
  case actionTypes.FIND_BARS_SUCCESS:
  case actionTypes.ADD_BAR_ERROR:
  case actionTypes.REMOVE_BAR_ERROR:
  case actionTypes.FIND_LOCATION_ERROR:
  case actionTypes.FIND_BARS_ERROR:
  case actionTypes.SHOW_VISITORS_LIST_SUCCESS:
  case actionTypes.SHOW_VISITORS_LIST_ERROR:
  case actionTypes.END_FACEBOOK_LOGIN:
  case actionTypes.ADD_BAR_SUCCESS:
  case actionTypes.REMOVE_BAR_SUCCESS:
  case actionTypes.SHOW_BASKET_SUCCESS:
  case actionTypes.SHOW_BASKET_ERROR:
  case actionTypes.ZERO_RESULTS_SEARCH_ERROR:
    return false;
  default:
    return state;
  }
};

const authenticated = (
  state = false,
  action,
) => {
  switch (action.type) {
  case actionTypes.FETCH_USER_SUCCESS:
  case actionTypes.LOGIN_SUCCESS_USER:
  case actionTypes.SIGNUP_SUCCESS_USER:
  case actionTypes.LOGOUT_ERROR_USER:
    return true;
  case actionTypes.FETCH_USER_ERROR:
  case actionTypes.SIGNUP_ERROR_USER:
  case actionTypes.LOGIN_ERROR_USER:
  case actionTypes.LOGOUT_SUCCESS_USER:
  case actionTypes.SESSION_EXPIRED:
    return false;
  case actionTypes.FIND_PLACES_SUCCESS:
    return action.userId != null;
  default:
    return state;
  }
};

const userId = (
  state = '',
  action,
) => {
  switch (action.type) {
  case actionTypes.FETCH_USER_SUCCESS:
  case actionTypes.LOGIN_SUCCESS_USER:
  case actionTypes.SIGNUP_SUCCESS_USER:
    return action.userId;
  case actionTypes.LOGOUT_SUCCESS_USER:
  case actionTypes.SESSION_EXPIRED:
  case actionTypes.FETCH_USER_ERROR:
    return '';
  case actionTypes.FIND_BARS_SUCCESS:
    return action.userId || '';
  default:
    return state;
  }
};

const username = (
  state = 'Guest',
  action,
) => {
  switch (action.type) {
  case actionTypes.FETCH_USER_SUCCESS:
  case actionTypes.LOGIN_SUCCESS_USER:
  case actionTypes.SIGNUP_SUCCESS_USER:
    return action.username;
  case actionTypes.LOGOUT_SUCCESS_USER:
  case actionTypes.SESSION_EXPIRED:
  case actionTypes.FETCH_USER_ERROR:
    return 'Guest';
  case actionTypes.FIND_BARS_SUCCESS:
    return action.username || 'Guest';
  default:
    return state;
  }
};

const facebookProfile = (
  state = null,
  action,
) => {
  switch (action.type) {
  case actionTypes.FETCH_USER_SUCCESS:
    return action.profile;
  case actionTypes.LOGIN_SUCCESS_USER:
  case actionTypes.SIGNUP_SUCCESS_USER:
  case actionTypes.LOGOUT_SUCCESS_USER:
  case actionTypes.SESSION_EXPIRED:
  case actionTypes.FETCH_USER_ERROR:
    return null;
  case actionTypes.FIND_BARS_SUCCESS:
    return action.profile;
  default:
    return state;
  }
};

const message = (
  state = [],
  action,
) => {
  switch (action.type) {
  case actionTypes.LOGIN_SUCCESS_USER:
  case actionTypes.SIGNUP_SUCCESS_USER:
  case actionTypes.SIGNUP_ERROR_USER:
  case actionTypes.LOGIN_ERROR_USER:
  case actionTypes.ADD_BAR_ERROR:
  case actionTypes.REMOVE_BAR_ERROR:
  case actionTypes.FIND_LOCATION_ERROR:
  case actionTypes.FIND_BARS_ERROR:
  case actionTypes.SHOW_VISITORS_LIST_ERROR:
  case actionTypes.SHOW_MESSAGE_DIALOG:
  case actionTypes.SHOW_BASKET_ERROR:
  case actionTypes.ZERO_RESULTS_SEARCH_ERROR:
    return [...state, action.message];
  case actionTypes.CLOSE_MESSAGE_DIALOG:
    return [];
  default:
    return state;
  }
};

const bars = (
  state = [],
  action,
) => {
  switch (action.type) {
  case actionTypes.FETCH_USER_ERROR:
  case actionTypes.SESSION_EXPIRED:
  case actionTypes.LOGOUT_SUCCESS_USER:
    return [];
  case actionTypes.LOGIN_SUCCESS_USER:
  case actionTypes.FETCH_USER_SUCCESS:
    return action.bars || [];
  case actionTypes.FIND_BARS_SUCCESS:
    return action.userBars || [];
  case actionTypes.ADD_BAR_TO_USER:
    return [...state, action.barId];
  case actionTypes.REMOVE_BAR_FROM_USER:
  {
    const updateUserBars = [...state];
    const index = updateUserBars.indexOf(action.barId);
    if (index >= 0) {
      updateUserBars.splice(index, 1);
    }

    return updateUserBars;
  }
  default:
    return state;
  }
};

const basket = (
  state = [],
  action,
) => {
  switch (action.type) {
  case actionTypes.FETCH_USER_ERROR:
  case actionTypes.SESSION_EXPIRED:
  case actionTypes.LOGOUT_SUCCESS_USER:
  case actionTypes.SHOW_BASKET_ERROR:
    return [];
  case actionTypes.SHOW_BASKET_SUCCESS:
    return action.basketList || [];
  case actionTypes.REMOVE_BAR_FROM_USER:
  {
    const updateUserBars = [...state];
    const index = updateUserBars.findIndex(elem => elem.barId === action.barId);
    if (index >= 0) {
      updateUserBars.splice(index, 1);
    }
    return updateUserBars;
  }
  default:
    return state;
  }
};

const userReducer = combineReducers({
  isWaiting,
  authenticated,
  userId,
  username,
  facebookProfile,
  message,
  bars,
  basket,
});

export default userReducer;
