import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { axiosInstance } from '../../config/app';
import actionTypes from './types';

function beginLocationSearch() {
  return { type: actionTypes.FIND_LOCATION };
}

function locationSearchSuccess(address, lat, lng) {
  return {
    type: actionTypes.FIND_LOCATION_SUCCESS,
    address,
    lat,
    lng,
  };
}

function locationSearchError(message) {
  return {
    type: actionTypes.FIND_LOCATION_ERROR,
    message,
  };
}

function beginBarsSearch() {
  return { type: actionTypes.FIND_BARS };
}

function barsSearchSuccess(bars, address, lat, lng, userBars, username, profile, userId) {
  return {
    type: actionTypes.FIND_BARS_SUCCESS,
    bars,
    address,
    lat,
    lng,
    userBars,
    username,
    profile,
    userId,
  };
}

function barsSearchError(message) {
  return {
    type: actionTypes.FIND_BARS_ERROR,
    message,
  };
}

function zeroResultsSearchError(message) {
  return {
    type: actionTypes.ZERO_RESULTS_SEARCH_ERROR,
    message,
  };
}

export function findLocation(address) {
  return (dispatch) => {
    dispatch(beginLocationSearch());
    return geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        dispatch(locationSearchSuccess(address, lat, lng));
      })
      .catch(() => {
        dispatch(locationSearchError('Your request could not be completed, something wrong with the address'));
      });
  };
}

export function showBars(service, address) {
  return (dispatch) => {
    dispatch(beginBarsSearch());
    return geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        const loc = new google.maps.LatLng(lat, lng); // coordinates of location
        const request = {
          location: loc,
          radius: '3000',
          type: ['bar'],
        };
        // find bars in the location
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // get number of visitors
            return axiosInstance.get('/currentUserPlacesData', {
              params: {
                bars: results.map(item => item.id),
              },
            })
              .then((response) => {
                // make list of bars
                const locationBars = results.map((item) => {
                  const photoUrl = item.photos
                    && item.photos[0]
                    && item.photos[0].getUrl
                    && item.photos[0].getUrl instanceof Function
                    && item.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
                  return {
                    id: item.id,
                    placeId: item.place_id,
                    name: item.name,
                    photoUrl,
                    rating: item.rating,
                    location: item.geometry.location,
                    address: item.vicinity,
                    visitorsCount: 0,
                    highlighted: false,
                  };
                });
                // add number of users on the list
                response.data.visitors.forEach((bar) => {
                  const i = locationBars.findIndex(elem => elem.id === bar.barId);
                  locationBars[i].visitorsCount = bar.count;
                });
                const { username = null, profile = null, userId = null } = response.data;
                dispatch(barsSearchSuccess(locationBars, address, lat, lng, response.data.currentUserBars, username, profile, userId));
              })
              .catch(() => {
                dispatch(barsSearchError('Unable to show results'));
              });
          }
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            return dispatch(zeroResultsSearchError('Sorry, no matches were found'));
          }
          dispatch(barsSearchError('Unable to show results'));
        });
      })
      .catch(() => {
        dispatch(barsSearchError('Unable to show results'));
      });
  };
}
