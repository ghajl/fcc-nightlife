import { combineReducers } from 'redux';
import actionTypes from '../actions/types';

const isWaiting = (
  state = false,
  action,
) => {
  switch (action.type) {
  case actionTypes.REMOVE_FROM_VISITORS_LIST:
  case actionTypes.ADD_TO_VISITORS_LIST:
  case actionTypes.FIND_LOCATION:
  case actionTypes.FIND_BARS:
  case actionTypes.LOGOUT_USER:
  case actionTypes.SIGNUP_USER:
  case actionTypes.FETCH_USER:
  case actionTypes.MANUAL_LOGIN_USER:
  case actionTypes.BEGIN_SHOW_VISITORS_LIST:
  case actionTypes.START_FACEBOOK_LOGIN:
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
  case actionTypes.MODIFY_VISITORS_LIST_ERROR:
  case actionTypes.FIND_LOCATION_ERROR:
  case actionTypes.FIND_BARS_ERROR:
  case actionTypes.SHOW_VISITORS_LIST_SUCCESS:
  case actionTypes.SHOW_VISITORS_LIST_ERROR:
  case actionTypes.END_FACEBOOK_LOGIN:
  case actionTypes.ADD_TO_VISITORS_LIST_SUCCESS:
  case actionTypes.REMOVE_FROM_VISITORS_LIST_SUCCESS:
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
    return action.userID != null;
  default:
    return state;
  }
};

const userID = (
  state = '',
  action,
) => {
  switch (action.type) {
  case actionTypes.FETCH_USER_SUCCESS:
  case actionTypes.LOGIN_SUCCESS_USER:
  case actionTypes.SIGNUP_SUCCESS_USER:
    return action.userID;
  case actionTypes.LOGOUT_SUCCESS_USER:
  case actionTypes.SESSION_EXPIRED:
  case actionTypes.FETCH_USER_ERROR:
    return '';
  case actionTypes.FIND_BARS_SUCCESS:
    return action.userID || '';
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
  case actionTypes.MODIFY_VISITORS_LIST_ERROR:
  case actionTypes.FIND_LOCATION_ERROR:
  case actionTypes.FIND_BARS_ERROR:
  case actionTypes.SHOW_VISITORS_LIST_ERROR:
  case actionTypes.SHOW_MESSAGE_DIALOG:
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
  case actionTypes.FETCH_USER_SUCCESS:
  case actionTypes.FETCH_USER_ERROR:
  case actionTypes.SESSION_EXPIRED:
  case actionTypes.LOGOUT_SUCCESS_USER:
    return [];
  case actionTypes.LOGIN_SUCCESS_USER:
    return action.bars || [];
  case actionTypes.FIND_BARS_SUCCESS:
    return action.userBars;
  case actionTypes.ADD_BAR_TO_USER:
    return [...state, action.barID];
  case actionTypes.REMOVE_BAR_FROM_USER:
  {
    const updateUserBars = [...state];
    const index = updateUserBars.indexOf(action.barID);
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
  userID,
  username,
  facebookProfile,
  message,
  bars,
});

export default userReducer;
