import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import createRoutes from '../../../client/routes';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer as router, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createMemoryHistory';
import thunk from 'redux-thunk';
import user from '../../../reducer'
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

export default (req, res) => {
const routes = createRoutes(store);
	let context = {};
	const content = renderToString(
		<Provider store={store}>
		    <StaticRouter location={req.url} context={context}>
			    {routes}
		    </StaticRouter>
	    </Provider>,
	);
	res.render('index', {title: 'Express', data: false, content });
}