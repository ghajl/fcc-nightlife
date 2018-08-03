import { combineReducers } from 'redux';
import { actionTypes } from '../actions';
import { defaultLocation } from '../util/locations';

const locationBars = (
  state = null,
  action,
) => {
  switch (action.type) {
  case actionTypes.FIND_LOCATION_SUCCESS:
    return null;
  case actionTypes.FIND_PLACES_SUCCESS:
    return action.data;
  case actionTypes.INCREMENT_VISITORS_COUNT:
  {
    const i = state.findIndex(elem => elem.id === action.placeID);
    const updateBar = { ...state[i], ...{ users: state[i].users + 1 } };
    const updateLocationBars = [
      ...state.slice(0, i),
      updateBar,
      ...state.slice(i + 1),
    ];
    return updateLocationBars;
  }
  case actionTypes.DECREMENT_VISITORS_COUNT:
  {
    // remove current user from the list of bar
    const i = state.findIndex(elem => elem.id === action.placeID);
    const updateBar = { ...state[i], ...{ users: state[i].users - 1 } };
    const updateLocationBars = [
      ...state.slice(0, i),
      updateBar,
      ...state.slice(i + 1),
    ];

    return updateLocationBars;
  }
  default:
    return state;
  }
};

const location = (
  state = defaultLocation.address,
  action,
) => {
  switch (action.type) {
  case actionTypes.FIND_LOCATION_SUCCESS:
    return action.location;
  case actionTypes.FIND_PLACES_SUCCESS:
    return action.address;
  default:
    return state;
  }
};

const lat = (
  state = defaultLocation.lat,
  action,
) => {
  switch (action.type) {
  case actionTypes.FIND_LOCATION_SUCCESS:
    return action.lat;
  case actionTypes.FIND_PLACES_SUCCESS:
    return action.lat;
  default:
    return state;
  }
};

const lng = (
  state = defaultLocation.lng,
  action,
) => {
  switch (action.type) {
  case actionTypes.FIND_LOCATION_SUCCESS:
    return action.lng;
  case actionTypes.FIND_PLACES_SUCCESS:
    return action.lng;
  default:
    return state;
  }
};

const locationReducer = combineReducers({
  locationBars,
  location,
  lat,
  lng,
});

export default locationReducer;
