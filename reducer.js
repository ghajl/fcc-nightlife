import {actionTypes} from './actions';

export function Bar(id, users) {
  this.id = id;
  this.users = users;
}

export const initialState = {
  isWaiting: false,
  authenticated: false,
  username: "Guest",
  userBars: [],
  message: "",
  router: null,
  bars: null,
  location: "San Francisco, CA",
  lat: 37.774,
  lng: -122.4194,
  height: 0,
  loginReturnPath: "/",
  guestBar: null,
  loginDialogOpen: false
}





export function user (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REMOVE_PLACE:
    case actionTypes.ADD_PLACE:
    case actionTypes.FIND_LOCATION:
    case actionTypes.LOGOUT_USER:
    case actionTypes.SIGNUP_USER:
    case actionTypes.MANUAL_LOGIN_USER:
      return {
        ...state,
        ...{ isWaiting: true }
      }
    case actionTypes.LOGIN_SUCCESS_USER:
    case actionTypes.SIGNUP_SUCCESS_USER:
      return {
        ...state,
        ...{ isWaiting: false,
              authenticated: true,
              username: action.username,
              userBars: action.places,
              message:  action.message,
              }

      }
    case actionTypes.SIGNUP_ERROR_USER:
    case actionTypes.LOGIN_ERROR_USER:
      return {
        ...state,
        ...{ isWaiting: false,
              authenticated: false,
              message: action.message }
      }
    case actionTypes.LOGOUT_ERROR_USER:  
      return {
        ...state,
        ...{ isWaiting: false,
              authenticated: true }
      }
    case actionTypes.LOGOUT_SUCCESS_USER:
      return {
        ...state,
        ...{ isWaiting: false,
              authenticated: false,
              username: "Guest",
              userBars: [] }
      }
    case actionTypes.FIND_LOCATION_SUCCESS:
      return {
        ...state,
        ...{ isWaiting: false,
              location: action.location,
              lat: action.lat,
              lng: action.lng }
      }
    case actionTypes.FIND_PLACES_SUCCESS:
      return {
        ...state,
        ...{ isWaiting: false,
              bars: action.data }
      }
    case actionTypes.REMOVE_PLACE_ERROR:
    case actionTypes.ADD_PLACE_ERROR:
    case actionTypes.FIND_LOCATION_ERROR: 
    case actionTypes.FIND_PLACES_ERROR:  
      return {
        ...state,
        ...{ isWaiting: false,
              message: action.message,
              guestBar: null}
      }
    case actionTypes.ADD_PLACE_SUCCESS:
      {
        //get index of bar in current location bars list
        let i = state.bars.reduce((acc, item, index) => item.id === action.placeID ? 
                                                   index : acc ,-1);
        let newBar = null;
        //check if the current user already in the list of users enrolled in the bar
        if(~state.bars[i].users.indexOf(state.username)){
          return state
        } else {
          newBar = {...state.bars[i], ...{users: [...state.bars[i].users, state.username]}}
        
        
          let newPlaces =  [ ...state.bars.slice(0,i), newBar, ...state.bars.slice(i + 1)]
      
      
          return {
            ...state,
            ...{ isWaiting: false,
                  message: action.message,
                  userBars: [...state.userBars,action.placeID],
                  bars: newPlaces,
                  guestBar: null}
          }    
      }
    }
    case actionTypes.REMOVE_PLACE_SUCCESS:
    {
      // console.log()
      let i = state.bars.reduce((acc, item, index) => item.id === action.placeID ? 
                                                 index : acc ,-1);
      let userOfBarIndex = state.bars[i].users.indexOf(state.username);
      // console.log(state.bars[i].users)
      // console.log(userOfBarIndex)
      state.bars[i].users.splice(userOfBarIndex, 1);
      let newBar = {...state.bars[i], ...{users: [...state.bars[i].users]}}
      let newPlaces =  [ ...state.bars.slice(0,i), newBar, ...state.bars.slice(i + 1)]
      // console.log(newPlaces[i].users)
      let newBars = [...state.userBars];
      let index = newBars.indexOf(action.placeID);
      if(index >= 0){
        newBars.splice(index, 1);
      }
      return {
        ...state,
        ...{ isWaiting: false,
              message: action.message,
              userBars: newBars,
              bars: newPlaces}
      }       
    }
    case actionTypes.SET_MAP_HEIGHT:
      return {
        ...state,
        ...{ height: action.data}
      }
    case actionTypes.SAVE_PATH:
      return {
        ...state,
        ...{ loginReturnPath: action.path}
      }
    case actionTypes.SAVE_GUEST_BAR:
      return {
        ...state,
        ...{ guestBar: action.placeID}
      }
    case actionTypes.OPEN_LOGIN:
      return {
        ...state,
        ...{ loginDialogOpen: true}
      }
    case actionTypes.CLOSE_LOGIN:
      return {
        ...state,
        ...{ loginDialogOpen: false}
      }

    default:
      return state
  }
}

export default user;

// const message = (
//   state = '',
//   action
// ) => {
//   switch (action.type) {
//     case types.MANUAL_LOGIN_USER:
//     case types.SIGNUP_USER:
//     case types.LOGOUT_USER:
//     case types.LOGIN_SUCCESS_USER:
//     case types.SIGNUP_SUCCESS_USER:
//       return '';
//     case types.LOGIN_ERROR_USER:
//     case types.SIGNUP_ERROR_USER:
//       return action.message;
//     default:
//       return state;
//   }
// };

// const isWaiting = (
//   state = false,
//   action
// ) => {
//   switch (action.type) {
//     case types.MANUAL_LOGIN_USER:
//     case types.SIGNUP_USER:
//     case types.LOGOUT_USER:
//       return true;
//     case types.LOGIN_SUCCESS_USER:
//     case types.SIGNUP_SUCCESS_USER:
//     case types.LOGOUT_SUCCESS_USER:
//     case types.LOGIN_ERROR_USER:
//     case types.SIGNUP_ERROR_USER:
//     case types.LOGOUT_ERROR_USER:
//       return false;
//     default:
//       return state;
//   }
// };

// const authenticated = (
//   state = false,
//   action
// ) => {
//   switch (action.type) {
//     case types.LOGIN_SUCCESS_USER:
//     case types.SIGNUP_SUCCESS_USER:
//     case types.LOGOUT_ERROR_USER:
//       return true;
//     case types.LOGIN_ERROR_USER:
//     case types.SIGNUP_ERROR_USER:
//     case types.LOGOUT_SUCCESS_USER:
//       return false;
//     default:
//       return state;
//   }
// };

// const username = (
//   state = "Guest",
//   action
// ) => {
//   switch (action.type) {
//     case types.SIGNUP_SUCCESS_USER:  
//     case types.LOGIN_SUCCESS_USER:
//       return action.username;
//     case types.LOGOUT_ERROR_USER:
//     case types.LOGIN_ERROR_USER:
//     case types.SIGNUP_ERROR_USER:
//     case types.LOGOUT_SUCCESS_USER:
//       return "Guest";
//     default:
//       return state;
//   }
// };