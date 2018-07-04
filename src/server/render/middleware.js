import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer as router, routerMiddleware, ConnectedRouter, push } from 'react-router-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import createHistory from 'history/createMemoryHistory';
import thunk from 'redux-thunk';
import user from '../../reducer'
import createRoutes from '../../client/routes';
import { Provider } from 'react-redux';
import serialize from "serialize-javascript"



export default (req, res) => {
	const path = req.path || '/';
	const combReducers = combineReducers({
    user,
    router
	});
	const history = createHistory({ initialEntries: [path] })
	const middlewareHistory = routerMiddleware(history);
	const store = createStore(
	    combReducers,
	    {},
	    applyMiddleware(
		    middlewareHistory,   
		    thunk
	    )
	);
  const routes = createRoutes(store);
	const branch = matchRoutes(routes, req.url.slice(0, req.url.indexOf('?')));
  const promises = branch.map(({route}) => {
    console.log(req.url)
    console.log(branch)
    console.log(route.fetch)

    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
  });
	
  return Promise.all(promises).then((data) => {
  	let context = {};
    const content = renderToString(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Provider>
    );
    	

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height">
		<link type="text/css" rel="stylesheet" href="public/main.css">
	    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
	    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo&libraries=geometry,drawing,places"></script>

	    <title>freeCodeCamp - Nightlife Coordination App</title>
          <script src="/dist/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="root">${content}</div>
        </body>
      </html>
    `)
  });


	// let context = {};
	// const content = renderToString(
	// 	<Provider store={store}>
	// 	    <StaticRouter location={req.url} context={context}>
	// 		    {routes}
	// 	    </StaticRouter>
	//     </Provider>,
	// );
	// res.render('index', {title: 'Express', data: false, content });
}