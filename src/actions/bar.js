import { push } from 'react-router-redux';
import { axiosInstance } from '../../config/app';
import actionTypes from './types';
import { showMessage } from './ui';

function addBarToUser(barId) {
  return {
    type: actionTypes.ADD_BAR_TO_USER,
    barId,
  };
}

function removeBarFromUser(barId) {
  return {
    type: actionTypes.REMOVE_BAR_FROM_USER,
    barId,
  };
}

function beginAddBar() {
  return { type: actionTypes.BEGIN_ADD_BAR };
}

function beginRemoveBar() {
  return { type: actionTypes.BEGIN_REMOVE_BAR };
}

function incrementVisitorsCount(barId) {
  return {
    type: actionTypes.INCREMENT_VISITORS_COUNT,
    barId,
  };
}

function sessionExpired() {
  return { type: actionTypes.SESSION_EXPIRED };
}

function addBarSuccess(barId, message) {
  return (dispatch, getState) => {
    const { bars } = getState().reducer.user;
    if (bars.indexOf(barId) === -1) {
      dispatch(incrementVisitorsCount(barId));
      dispatch(addBarToUser(barId));
      dispatch(showMessage(message));
    }
    dispatch({ type: actionTypes.ADD_BAR_SUCCESS });
  };
}

function addBarError(message) {
  return {
    type: actionTypes.ADD_BAR_ERROR,
    message,
  };
}

function removeBarError(message) {
  return {
    type: actionTypes.REMOVE_BAR_ERROR,
    message,
  };
}

function decrementVisitorsCount(barId) {
  return {
    type: actionTypes.DECREMENT_VISITORS_COUNT,
    barId,
  };
}

function removeBarSuccess(barId, message) {
  return (dispatch, getState) => {
    const { bars } = getState().reducer.user;
    if (bars.indexOf(barId) !== -1) {
      dispatch(decrementVisitorsCount(barId));
      dispatch(removeBarFromUser(barId));
      dispatch(showMessage(message));
    }
    dispatch({ type: actionTypes.REMOVE_BAR_SUCCESS });
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

export function showVisitorsList(barId) {
  return (dispatch) => {
    dispatch(beginShowVisitorsList());
    return axiosInstance.get('/visitors', { params: { barId } })
      .then((response) => {
        dispatch(showVisitorsListSuccess(response.data.visitors));
      })
      .catch(() => {
        dispatch(showVisitorsListError('Unable to perform requested operation'));
      });
  };
}

export function addBar(barId, fromLogin = false) {
  return (dispatch, getState) => {
    const { userId } = getState().reducer.user;
    const { bars } = getState().reducer.location;
    const i = bars.findIndex(elem => elem.id === barId);
    const { placeId } = bars[i];
    const data = {
      barId, placeId, userId,
    };
    const successMessage = 'You have successfully added to the list!';
    dispatch(beginAddBar());
    return axiosInstance.post('/addBar', data)
      .then(() => {
        dispatch(addBarSuccess(data.barId, successMessage));
        if (fromLogin) {
          dispatch(push('/return-from-success-login'));
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === '401') {
            dispatch(sessionExpired());
            dispatch(addBarError('You are not logged in'));
          }
          if (err.response.status === '403') {
            dispatch(addBarError('You are logged in to another account'));
          }
        }
        dispatch(addBarError('Your request could not be completed'));
      });
  };
}

export function removeBar(barId, placeId) {
  return (dispatch, getState) => {
    const { userId } = getState().reducer.user;
    const data = {
      barId, placeId, userId,
    };
    const successMessage = 'You have successfully removed from the list!';
    dispatch(beginRemoveBar());
    return axiosInstance.post('/removeBar', data)
      .then(() => {
        dispatch(removeBarSuccess(data.barId, successMessage));
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === '401') {
            dispatch(sessionExpired());
            dispatch(removeBarError('You are not logged in'));
          }
          if (err.response.status === '403') {
            dispatch(removeBarError('You are logged in to another account'));
          }
        }
        dispatch(removeBarError('Your request could not be completed'));
      });
  };
}

export function closeVisitorsList() {
  return { type: actionTypes.CLOSE_VISITORS_LIST };
}

export function highlightPlace(barId) {
  return {
    type: actionTypes.HIGHLIGHT_PLACE,
    barId,
  };
}
