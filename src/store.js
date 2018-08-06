import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
// import user from './reducer';
import rootReducer from './reducers';

const config = {
  key: 'root',
  storage: sessionStorage,
};

// const combReducers = combineReducers({
//   user,
//   router,
// });

const reducers = persistCombineReducers(config, { reducer: rootReducer });

let persistor = null;

export function configureStore(history) {
  const middleware = [thunk, routerMiddleware(history)];
  const store = createStore(
    reducers,
    undefined,
    applyMiddleware(...middleware),
  );

  persistor = persistStore(store);
  return { store, persistor };
}

export function getPersistor() {
  return persistor;
}
