import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { configureStore } from './store';
import Root from './containers/Root';
import { basename } from '../config/app';

const history = createHistory({ basename });
const { store, persistor } = configureStore(history);
render(
  <Root
    store={store}
    history={history}
    persistor={persistor}
  />,
  document.getElementById('root'),
);
