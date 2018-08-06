import { axiosInstance } from '../../config/app';
import actionTypes from './types';

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

export default function fetchUserData() {
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
