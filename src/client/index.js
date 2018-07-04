import React from 'react';
import {render, hydrate} from 'react-dom';
import { routerReducer as router, routerMiddleware, ConnectedRouter, push } from 'react-router-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import createHistory from 'history/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import createRoutes from './routes';
import user from '../reducer';

const combReducers = combineReducers({
    user,
    router
});
const history = createHistory();
const middlewareHistory = routerMiddleware(history);
const store = createStore(
    combReducers,
    applyMiddleware(
	    middlewareHistory,   
	    thunk
    )
);

const routes = createRoutes(store);

const AppRouter = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </Provider>
  )
}

hydrate(<AppRouter />, document.getElementById('root'));

// import "babel-polyfill";
// import 'normalize.css';
// import React from 'react';
// import {render} from 'react-dom';
// import createHistory from 'history/createBrowserHistory';
// import { configureStore } from './store';
// import Root from './client/containers/Root'
// const history = createHistory();
// const {store, persistor} = configureStore(history);

// render(
//     <Root 
//   		store={store} 
//   		history={history} 
//   		persistor={persistor}
//   		/>,
//     document.getElementById('root')
// )

