import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducer from './reducer'

import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export function configureStore (){
	
	const store = createStore(
	  combineReducers({
	    ...reducer,
	    router: routerReducer
	  }),
	  applyMiddleware(middleware)
	);

    return {store, history};
}







// export function configureStore (state = initialState){
	
//   const store = createStore(
//     reducer,
//     state,
//     );

//    return store;
// }