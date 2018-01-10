import {actionTypes} from './actions';


export const initialState = {
	error: false,
  places: [],
  router: null,
}


export function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{error: true}
      }

    

    default:
      return state
  }
}

export default reducer