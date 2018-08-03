import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { actionTypes } from '../actions';
import bar from './bar';
import location from './location';
import user from './user';

const returnPath = (
  state = '/',
  action,
) => {
  switch (action.type) {
  case actionTypes.SAVE_PATH:
    return action.path;
  default:
    return state;
  }
};

const guestBar = (
  state = null,
  action,
) => {
  switch (action.type) {
  case actionTypes.FETCH_USER_ERROR:
  case actionTypes.LOGOUT_SUCCESS_USER:
  case actionTypes.MODIFY_LIST_ERROR:
  case actionTypes.FIND_LOCATION_ERROR:
  case actionTypes.FIND_PLACES_ERROR:
  case actionTypes.ADD_TO_LIST_SUCCESS:
    return null;
  case actionTypes.SAVE_GUEST_BAR:
    return action.placeID;
  default:
    return state;
  }
};

const loginDialogOpen = (
  state = false,
  action,
) => {
  switch (action.type) {
  case actionTypes.LOGIN_SUCCESS_USER:
  case actionTypes.SIGNUP_SUCCESS_USER:
  case actionTypes.CLOSE_LOGIN_DIALOG:
  case actionTypes.START_FACEBOOK_LOGIN:
    return false;
  case actionTypes.OPEN_LOGIN_DIALOG:
    return true;
  default:
    return state;
  }
};

const loginMenuOpen = (
  state = false,
  action,
) => {
  switch (action.type) {
  case actionTypes.CLOSE_LOGIN_MENU:
    return false;
  case actionTypes.OPEN_LOGIN_MENU:
    return true;
  default:
    return state;
  }
};

const messageDialogOpen = (
  state = false,
  action,
) => {
  switch (action.type) {
  case actionTypes.CLOSE_MESSAGE_DIALOG:
    return false;
  case actionTypes.LOGIN_SUCCESS_USER:
  case actionTypes.SIGNUP_SUCCESS_USER:
  case actionTypes.SIGNUP_ERROR_USER:
  case actionTypes.LOGIN_ERROR_USER:
  case actionTypes.MODIFY_LIST_ERROR:
  case actionTypes.FIND_LOCATION_ERROR:
  case actionTypes.FIND_PLACES_ERROR:
  case actionTypes.SHOW_LIST_ERROR:
  case actionTypes.SHOW_MESSAGE_DIALOG:
    return true;
  default:
    return state;
  }
};

const listDialogOpen = (
  state = false,
  action,
) => {
  switch (action.type) {
  case actionTypes.CLOSE_USERS_LIST:
    return false;
  case actionTypes.SHOW_LIST_SUCCESS:
    return true;
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  router,
  bar,
  location,
  user,
  returnPath,
  guestBar,
  loginDialogOpen,
  loginMenuOpen,
  messageDialogOpen,
  listDialogOpen,
});

export default rootReducer;
