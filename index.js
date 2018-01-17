import React from 'react';
import {render} from 'react-dom';
import 'normalize.css';
// import {browserHistory} from 'react-router';
import createHistory from 'history/createBrowserHistory';
// import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from './store';
import Root from './client/components/Root'
const history = createHistory();
const {store, persistor} = configureStore(history);
// const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} persistor={persistor}/>,
  document.getElementById('root')
)

