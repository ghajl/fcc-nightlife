import {actionTypes} from './actions';
import {defaultLocation} from './util/locations';

export const initialState = {
    isWaiting: false,
    authenticated: false,
    username: "Guest",
    userBars: [],
    message: [],
    router: null,
    bars: null,
    location: defaultLocation.address,
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
    signupReturnPath: "/",
    guestBar: null,
    loginDialogOpen: false,
    loginMenuOpen: false,
    messageDialogOpen: false,
    highlighted: null,
    footerHeight: 0,
    headerHeight: 0
}





export function user (state = initialState, action) {
    switch (action.type) {
        case actionTypes.REMOVE_FROM_LIST:
        case actionTypes.ADD_TO_LIST:
        case actionTypes.FIND_LOCATION:
        case actionTypes.FIND_PLACES:
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
                    message:  [...state.message, action.message],
                    messageDialogOpen: true,
                    loginDialogOpen: false,
                    }

            }
        case actionTypes.SIGNUP_ERROR_USER:
        case actionTypes.LOGIN_ERROR_USER:
            return {
                ...state,
                ...{ isWaiting: false,
                    authenticated: false,
                    messageDialogOpen: true,
                    message: [...state.message, action.message] }
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
                    userBars: [], 
                    highlighted: null,
                    guestBar: null }
            }
        case actionTypes.FIND_LOCATION_SUCCESS:
            return {
                ...state,
                ...{ isWaiting: false,
                    location: action.location,
                    lat: action.lat,
                    lng: action.lng,
                    bars: null }
            }
        case actionTypes.FIND_PLACES_SUCCESS:
            return {
                ...state,
                ...{ isWaiting: false,
                    bars: action.data,
                    location: action.address,
                    lat: action.lat,
                    lng: action.lng }
            }
        case actionTypes.REMOVE_FROM_LIST_ERROR:
        case actionTypes.ADD_TO_LIST_ERROR:
        case actionTypes.FIND_LOCATION_ERROR: 
        case actionTypes.FIND_PLACES_ERROR:  
            return {
                ...state,
                ...{ isWaiting: false,
                    messageDialogOpen: true,
                    message: [...state.message, action.message],
                    guestBar: null}
            }
        case actionTypes.ADD_TO_LIST_SUCCESS:
            {
                //get index of bar in current location bars list
                let i = state.bars.reduce((acc, item, index) => item.id === action.placeID ? 
                                                           index : acc ,-1);
                let newBar = null;
                //check if the current user already in the list
                if(~state.bars[i].users.indexOf(state.username)){
                    return {
                        ...state,
                        ...{ isWaiting: false}
                    }    
                } else {
                    newBar = {...state.bars[i], ...{users: [...state.bars[i].users, state.username]}}
                  
                  
                    let newPlaces =  [ ...state.bars.slice(0,i), newBar, ...state.bars.slice(i + 1)]
                
                
                    return {
                        ...state,
                        ...{ isWaiting: false,
                            message: [...state.message, action.message],
                            messageDialogOpen: true,
                            userBars: [...state.userBars,action.placeID],
                            bars: newPlaces,
                            guestBar: null}
                }    
            }
        }
        case actionTypes.REMOVE_FROM_LIST_SUCCESS:
        {
            let placeIndex = state.bars.reduce((acc, item, index) => item.id === action.placeID ? 
                                                       index : acc ,-1);
            let usersListIndex = state.bars[placeIndex].users.indexOf(state.username);
            //remove user from users array in bar
            state.bars[placeIndex].users.splice(usersListIndex, 1);
            let newBar = {...state.bars[placeIndex], ...{users: [...state.bars[placeIndex].users]}}
            let newPlaces =  [ ...state.bars.slice(0,placeIndex), newBar, ...state.bars.slice(placeIndex + 1)]
            let newUserBars = [...state.userBars];
            let index = newUserBars.indexOf(action.placeID);
            //remove bar from bars array in user
            if(index >= 0){
                newUserBars.splice(index, 1);
            }
            return {
                ...state,
                ...{ isWaiting: false,
                    message: [...state.message, action.message],
                    messageDialogOpen: true,
                    userBars: newUserBars,
                    bars: newPlaces}
            }       
        }
        case actionTypes.HIGHLIGHT_PLACE:
            return {
              ...state,
              ...{ 
                      highlighted: action.placeID
                  }
            }
        
        case actionTypes.SAVE_PATH:
            return {
                ...state,
                ...{ signupReturnPath: action.path}
            }
        case actionTypes.SAVE_GUEST_BAR:
            return {
                ...state,
                ...{ guestBar: action.placeID}
            }
        case actionTypes.OPEN_LOGIN_DIALOG:
            return {
                ...state,
                ...{ loginDialogOpen: true}
            }
        case actionTypes.CLOSE_LOGIN_DIALOG:
            return {
                ...state,
                ...{ loginDialogOpen: false}
            }

        case actionTypes.OPEN_LOGIN_MENU:
            return {
                ...state,
                ...{ loginMenuOpen: true}
            }

        case actionTypes.CLOSE_LOGIN_MENU:
            return {
                ...state,
                ...{ loginMenuOpen: false}
            }

        case actionTypes.SHOW_MESSAGE_DIALOG:
            return {
                ...state,
                ...{ messageDialogOpen: true,
                    message: [...state.message, action.message] }
            }
        case actionTypes.CLOSE_MESSAGE_DIALOG:
            return {
                ...state,
                ...{ messageDialogOpen: false,
                    message: []}
            }
        case actionTypes.FOOTER_HEIGHT:
            return {
                ...state,
                ...{ footerHeight: action.height}
            }
        case actionTypes.HEADER_HEIGHT:
            return {
                ...state,
                ...{ headerHeight: action.height}
            }
        default:
            return state
    }
}

export default user;
