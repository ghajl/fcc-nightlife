import { push, replace } from 'react-router-redux';
import actionTypes from './types';

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

export function saveReturnTo(path) {
  return {
    type: actionTypes.SAVE_PATH,
    path,
  };
}
