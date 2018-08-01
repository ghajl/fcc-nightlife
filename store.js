import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import user from './reducer';

const config = {
  key: 'root',
  storage: sessionStorage,
};

const combReducers = combineReducers({
  user,
  router,
});

const reducers = persistCombineReducers(config, { reducer: combReducers });

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
