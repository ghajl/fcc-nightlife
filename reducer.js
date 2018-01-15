import {actionTypes} from './actions';


export const initialState = {
  isWaiting: false,
  authenticated: false,
  username: "Guest",
  message: "",
  router: null,
}


export function user (state = initialState, action) {
  switch (action.type) {
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
              message:  action.message}

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
              username: "Guest" }
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