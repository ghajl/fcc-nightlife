import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { configureStore } from './store';
import Root from './client/containers/Root';

const history = createHistory();
const { store, persistor } = configureStore(history);
render(
  <Root
    store={store}
    history={history}
    persistor={persistor}
  />,
  document.getElementById('root'),
);
