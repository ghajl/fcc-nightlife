import { combineReducers } from 'redux';
import actionTypes from '../actions/types';

const visitors = (
  state = [],
  action,
) => {
  switch (action.type) {
  case actionTypes.SHOW_VISITORS_LIST_SUCCESS:
    return action.visitors;
  case actionTypes.CLOSE_VISITORS_LIST:
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
    return action.barID;
  case actionTypes.LOGOUT_SUCCESS_USER:
  case actionTypes.FETCH_USER_ERROR:
    return null;
  default:
    return state;
  }
};

const barReducer = combineReducers({
  visitors,
  highlighted,
});

export default barReducer;
