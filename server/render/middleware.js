import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import createRoutes from '../../../client/routes';

export default (req, res) => {
	let context = {};
	const content = renderToString(
		    <StaticRouter location={req.url} context={context}>
			    
		    </StaticRouter>
	);
	res.render('index', {title: 'Express', data: false, content });
}