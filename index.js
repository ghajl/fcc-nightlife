import React from 'react';
import {render} from 'react-dom';
import 'normalize.css';
// import {BrowserRouter as Router, Route} from 'react-router-dom';

// import { Provider } from 'react-redux';
import { configureStore } from './store';
import Root from './components/Root'

let {store, history} = configureStore();

render(
  <Root store={store} history={history}/>,
  document.getElementById('root')
)

