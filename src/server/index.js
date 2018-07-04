import express from "express";
// import webpack from 'webpack';
// import webpackConfig from '../webpack.config.js';
import session from "express-session";
import bodyParser from "body-parser";
import connectMongo from "connect-mongo";
import initMongo from './init/mongo';
import initRoutes from './init/routes';
import initPassport from './init/passport';
import renderMiddleware from "./render/middleware";
import passport from "passport";
const app = express();
// const compiler = webpack(webpackConfig);
const cors = require('cors');

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/dist', express.static(process.cwd() + '/dist'));
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let config = null;
const isDev = process.env.NODE_ENV === "development";
if(isDev) {
    config = require("./config").config;
// 	app.use(webpackDevMiddleware(compiler, {
// 	    publicPath: webpackConfig.output.publicPath
// 	}));
// 	app.use(webpackHotMiddleware(compiler));
// 	app.use(cors({
// 	    origin: 'http://localhost:3000/',
// 	    credentials: true
// 	}));
}



const mongoUri = process.env.MONGOLAB_URI || config.MONGOLAB_URI;

initMongo(mongoUri);

initPassport(passport, config);

const MongoStore = connectMongo(session);
const sessionSecret = process.env.SESSION_SECRET || config.SESSION_SECRET;
const sess = { 
	secret: sessionSecret, 
	resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
	store: new MongoStore({
		url: mongoUri,
		autoReconnect: true
	})
}

app.use(session(sess));


// // Initialize Passport and restore authentication state, if any, from the
// // session.
app.use(passport.initialize());
app.use(passport.session());
app.options('*', cors()) ;
//save url for redirecting after successful facebook authentication
app.use((req, res, next) => {
	if(req.path !== '/login' &&
	    req.path !== '/signup' && 
	    !req.path.match(/^\/auth/) &&
	    !req.path.match(/^\/data/) &&
	    !req.path.match(/\./)) {
			req.session.returnTo = '/';
		}
	next();
});

app.get('/privacypolicy', function(req, res) {
  res.sendFile(process.cwd() + "/public/privacypolicy.htm");
});
app.get('/favicon.ico', (req, res) => res.status(204));
initRoutes(app, passport);
app.get('*', renderMiddleware);
// const bundlePath = "/dist/bundle.js";
// app.all("*", (req, res, next) => {	

// 	const appHTML = 
// 	`<!doctype html>
// 	<html lang="">
// 	<head>
// 		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
// 		<meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height">
// 		<link type="text/css" rel="stylesheet" href="public/main.css">
// 	    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
// 	    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo&libraries=geometry,drawing,places"></script>

// 	    <title>freeCodeCamp - Nightlife Coordination App</title>
		
// 	</head>
// 	<body>
// 		<div id="root"></div>

// 		<script src=${bundlePath}></script>
// 	</body>
// 	</html>`

// 	res.status(200).end(appHTML)

// })
var port = process.env.PORT || 3000;
app.listen( port, function () {
    console.log('app listening on port ' + port + '\n');
});

