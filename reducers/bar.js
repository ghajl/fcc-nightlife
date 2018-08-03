import { combineReducers } from 'redux';
import { actionTypes } from '../actions';

const barUserslist = (
  state = [],
  action,
) => {
  switch (action.type) {
  case actionTypes.SHOW_LIST_SUCCESS:
    return action.users;
  case actionTypes.CLOSE_USERS_LIST:
    return [];
  default:
    return state;
  }
};

const highlighted = (
  state = null,
  action,
) => {
  switch (action.type) {
  case actionTypes.HIGHLIGHT_PLACE:
    return action.placeID;
  case actionTypes.LOGOUT_SUCCESS_USER:
  case actionTypes.FETCH_USER_ERROR:
    return null;
  default:
    return state;
  }
};

const barReducer = combineReducers({
  barUserslist,
  highlighted,
});

export default barReducer;
