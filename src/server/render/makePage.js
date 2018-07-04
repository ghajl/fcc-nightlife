import { renderToString } from 'react-dom/server';
import Root from '../shared/Root';
import React from 'react';
import serialize from 'serialize-javascript';

	const bundlePath = '/dist/bundle.js';
	const markup = renderToString(
        <Root 
  		store={store} 
  		history={history} 
  		persistor={persistor}
  		/>
  )

	const appHTML = 
	`<!doctype html>
	<html lang="">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height">
		<link type="text/css" rel="stylesheet" href="public/main.css">
	    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
	    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo&libraries=geometry,drawing,places"></script>

	    <title>freeCodeCamp - Nightlife Coordination App</title>
		
	</head>
	<body>
		<div id="root">{markup}</div>

		<script src=${bundlePath}></script>
	</body>
	</html>`

	// <script>window.__INITIAL_DATA__ = ${serialize(name)}</script>