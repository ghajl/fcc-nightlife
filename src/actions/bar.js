import { push } from 'react-router-redux';
import { axiosInstance } from '../../config/app';
import actionTypes from './types';
import { showMessage } from './ui';

function addBarToUser(barID) {
  return {
    type: actionTypes.ADD_BAR_TO_USER,
    barID,
  };
}

function removeBarFromUser(barID) {
  return {
    type: actionTypes.REMOVE_BAR_FROM_USER,
    barID,
  };
}

function beginAddToVisitorsList() {
  return { type: actionTypes.ADD_TO_VISITORS_LIST };
}

function incrementVisitorsCount(barID) {
  return {
    type: actionTypes.INCREMENT_VISITORS_COUNT,
    barID,
  };
}

function sessionExpired() {
  return { type: actionTypes.SESSION_EXPIRED };
}

function addToVisitorsListSuccess(barID, message) {
  return (dispatch, getState) => {
    const { bars } = getState().reducer.user;
    if (bars.indexOf(barID) === -1) {
      dispatch(incrementVisitorsCount(barID));
      dispatch(addBarToUser(barID));
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

function decrementVisitorsCount(barID) {
  return {
    type: actionTypes.DECREMENT_VISITORS_COUNT,
    barID,
  };
}

function removeFromVisitorsListSuccess(barID, message) {
  return (dispatch, getState) => {
    const { bars } = getState().reducer.user;
    if (bars.indexOf(barID) !== -1) {
      dispatch(decrementVisitorsCount(barID));
      dispatch(removeBarFromUser(barID));
      dispatch(showMessage(message));
    }
    dispatch({ type: actionTypes.REMOVE_FROM_VISITORS_LIST_SUCCESS });
  };
}

function beginShowVisitorsList() {
  return { type: actionTypes.BEGIN_SHOW_VISITORS_LIST };
}

function showVisitorsListSuccess(visitors) {
  return {
    type: actionTypes.SHOW_VISITORS_LIST_SUCCESS,
    visitors,
  };
}
function showVisitorsListError(message) {
  return {
    type: actionTypes.SHOW_VISITORS_LIST_ERROR,
    message,
  };
}

export function showVisitorsList(barID) {
  return (dispatch) => {
    dispatch(beginShowVisitorsList());
    return axiosInstance.get('/visitors', { params: { barID } })
      .then((response) => {
        dispatch(showVisitorsListSuccess(response.data.visitors));
      })
      .catch(() => {
        dispatch(showVisitorsListError('Unable to perform requested operation'));
      });
  };
}

export function modifyVisitorsList(barID, userID, operation, dispatch, fromLogin = false) {
  const data = { barID, userID, operation };
  const successMessage = operation === 'ADD'
    ? 'You have successfully added to the list!'
    : 'You have successfully removed from the list!';
  const successAction = operation === 'ADD'
    ? addToVisitorsListSuccess(data.barID, successMessage)
    : removeFromVisitorsListSuccess(data.barID, successMessage);
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
          dispatch(sessionExpired());
          dispatch(modifyVisitorsListError('You are not logged in'));
        }
        if (err.response.status === '403') {
          dispatch(modifyVisitorsListError('You are logged in to another account'));
        }
      }
      dispatch(modifyVisitorsListError('Your request could not be completed'));
    });
}

export function addToVisitorsList(barID) {
  return (dispatch, getState) => {
    const { userID } = getState().reducer.user;
    const operation = 'ADD';
    modifyVisitorsList(barID, userID, operation, dispatch);
  };
}

export function closeVisitorsList() {
  return { type: actionTypes.CLOSE_VISITORS_LIST };
}

export function removeFromVisitorsList(barID) {
  return (dispatch, getState) => {
    const { userID } = getState().reducer.user;
    const operation = 'REMOVE';
    modifyVisitorsList(barID, userID, operation, dispatch);
  };
}

export function highlightPlace(barID) {
  return {
    type: actionTypes.HIGHLIGHT_PLACE,
    barID,
  };
}
