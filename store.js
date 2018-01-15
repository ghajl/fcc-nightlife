import { createStore, combineReducers, applyMiddleware } from 'redux'
import user, {initialState} from './reducer'
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory();
// const middleware = routerMiddleware(history);
// Build the middleware for intercepting and dispatching navigation actions

const config = {
  key: 'root',
  storage,
}
let combReducers = combineReducers({
	    user,
	    router
	  });
const reducers = persistCombineReducers(config, {reducer: combReducers});

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export function configureStore (history){
	const middleware = [thunk, routerMiddleware(history)];
	const store = createStore(
	  reducers,
	  undefined,
	  applyMiddleware(...middleware)
	);
	const persistor = persistStore(store);
    return {store, persistor};
}







// export function configureStore (state = initialState){
	
//   const store = createStore(
//     reducer,
//     state,
//     );

//    return store;
// }