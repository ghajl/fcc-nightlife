import {actionTypes} from './actions';
import {defaultLocation} from './util/locations';

export const initialState = {
    isWaiting: false,
    authenticated: false,
    userID: '',
    username: "Guest",
    facebookProfile: null,
    userBars: [],
    message: [],
    barUserslist:[],

    /*
    locationBars: {
            id, 
            name,
            photoUrl, 
            rating,
            location, 
            address, 
            users,
            highlighted
        }[]
    */
    locationBars: null,
    location: defaultLocation.address,
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
    returnPath: "/",
    guestBar: null,
    loginDialogOpen: false,
    loginMenuOpen: false,
    messageDialogOpen: false,
    listDialogOpen: false,
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
        case actionTypes.FETCH_USER:
        case actionTypes.MANUAL_LOGIN_USER:
            return {
                ...state,
                ...{ isWaiting: true }
            }
        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                ...{
                    isWaiting: false,
                    authenticated: true,
                    username: action.username,
                    userID: action.userID,
                    userBars: [],
                    facebookProfile: action.profile,
                    
                }
            }    
        case actionTypes.FETCH_USER_ERROR:
            return {
                ...state,
                ...{
                    isWaiting: false,
                    authenticated: false,
                    username: "Guest",
                    facebookProfile: null,
                    userBars: [], 
                    highlighted: null,
                    guestBar: null
                }
            }                  
        case actionTypes.LOGIN_SUCCESS_USER:
        case actionTypes.SIGNUP_SUCCESS_USER:
            return {
                ...state,
                ...{ isWaiting: false,
                    authenticated: true,
                    username: action.username,
                    userID: action.userID,
                    facebookProfile: null,
                    userBars: action.places || [],
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
                    userID: '',
                    facebookProfile: null,
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
                    locationBars: null }
            }
        case actionTypes.FIND_PLACES_SUCCESS:
            {
                let data = {
                    isWaiting: false,
                    locationBars: action.data,
                    location: action.address,
                    lat: action.lat,
                    lng: action.lng,
                    userBars: action.userBars, 
                    username: action.username || "Guest", 
                    facebookProfile: action.profile, 
                    userID: action.userID || '',
                    authenticated: action.userID != null
                }
                
                return {
                    ...state,
                    ...data
                }    
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
                let i = state.locationBars.findIndex(elem => elem.id === action.placeID);
                
                //check if the current user already in the list - in the case of user pressed add button before login
                if(~state.userBars.indexOf(action.placeID)){
                    return {
                        ...state,
                        ...{ 
                            isWaiting: false, 
                            guestBar: null
                        }
                    }    
                } else {
                    const updateBar = {...state.locationBars[i], ...{users: state.locationBars[i].users + 1}};
                    const updateLocationBars =  [ ...state.locationBars.slice(0,i), updateBar, ...state.locationBars.slice(i + 1)];
                    return {
                        ...state,
                        ...{ isWaiting: false,
                            message: [...state.message, action.message],
                            messageDialogOpen: true,
                            userBars: [...state.userBars,action.placeID],
                            locationBars: updateLocationBars,
                            guestBar: null}
                }    
            }
        }
        case actionTypes.REMOVE_FROM_LIST_SUCCESS:
        {

            //reduce number of users on the list of bar
            const i = state.locationBars.findIndex(elem => elem.id === action.placeID);
            const updateBar = {...state.locationBars[i], ...{users: state.locationBars[i].users - 1}};
            const updateLocationBars =  [ ...state.locationBars.slice(0,i), updateBar, ...state.locationBars.slice(i + 1)];


            //remove bar from list of bars of current user
            let updateUserBars = [...state.userBars];
            const index = updateUserBars.indexOf(action.placeID);
            
            if(index >= 0){
                updateUserBars.splice(index, 1);
            }
            
            return {
                ...state,
                ...{ isWaiting: false,
                    message: [...state.message, action.message],
                    messageDialogOpen: true,
                    userBars: updateUserBars,
                    locationBars: updateLocationBars}
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
                ...{ returnPath: action.path}
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
        case actionTypes.BEGIN_SHOW_LIST:
            return {
                ...state,
                ...{ isWaiting: true}
            }
        case actionTypes.SHOW_LIST_SUCCESS:
            return {
                ...state,
                ...{ 
                    isWaiting: false,
                    barUserslist: action.users,
                    listDialogOpen: true
                }
            }
        case actionTypes.SHOW_LIST_ERROR:
            return {
                ...state,
                ...{ 
                    isWaiting: false,
                    messageDialogOpen: true,
                    message: [...state.message, action.message]
                }
            }
        case actionTypes.CLOSE_USERS_LIST:
            return {
                ...state,
                ...{ 
                    barUserslist: [],
                    listDialogOpen: false
                }
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
        case actionTypes.START_FACEBOOK_LOGIN:
            return {
                ...state,
                ...{ 
                    loginDialogOpen: false,
                    isWaiting: true
                }
            }
        case actionTypes.END_FACEBOOK_LOGIN:
            return {
                ...state,
                ...{ 
                    
                    isWaiting: false
                }
            }
        default:
            return state
    }
}

export default user;
