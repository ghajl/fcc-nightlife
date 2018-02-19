// require("babel-register");
import express from "express";
import mongoose from "mongoose";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.js';
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import session from "express-session";
import bodyParser from "body-parser";
import connectMongo from "connect-mongo";
import initRoutes from './init/routes';
import User from "./models/user";

const app = express();
const compiler = webpack(webpackConfig);
const cors = require('cors');
let config = null;
const isDev = process.env.NODE_ENV === "development";
if(isDev) {
// import {config} from "./config";
    config = require("./config").config;
    console.log(config)
	app.use(webpackDevMiddleware(compiler, {
	    publicPath: webpackConfig.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler));
	app.use(cors({
	    origin: 'http://localhost:3000/',
	    credentials: true
	}));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));
const mongoDB = process.env.MONGOLAB_URI || config.MONGOLAB_URI;
const connect = () => {
	mongoose.connect(mongoDB, {
	    useMongoClient: true
	}, (err, res) => {
		if (err) {
			console.log(`Error connecting`)
		} else {
			console.log(`Successfully connected`)
		}
	});
}
connect();
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error)
db.on("disconnected", connect)




passport.use(new LocalStrategy(
    function(username, password, cb) {
	    User.findOne({ username: username }, function(err, user) {
	        if (err) { return cb(err); }
	        if (!user) return cb(null, false, { message: `User not found` })
	        user.comparePassword(password, (err, isMatch) => {
	 			if (isMatch) {
	 				return cb(null, user)
	 			} else {
	 				return cb(null, false, { message: "Invalid username or password" })
	 			}

	 		})
    });
}));

passport.serializeUser((user, done) => {  	
  	done(null, user.id)
})

passport.deserializeUser((id, done) => {
  	User.findById(id, (err, user) => {      
  		done(err, user)
  	})
})

const MongoStore = connectMongo(session);

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({ 
	secret: 'keyboard cat', 
	resave: true, 
	saveUninitialized: true,
	store: new MongoStore({
		url: mongoDB,
		autoReconnect: true
	})
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.options('*', cors()) 
initRoutes(app);

app.all("*", (req, res, next) => {	

	const appHTML = 
	`<!doctype html>
	<html lang="">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
		<meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height">
		<link type="text/css" rel="stylesheet" href="public/main.css">
	    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
	    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo&libraries=geometry,drawing,places"></script>

	    <title></title>
		
	</head>
	<body>
		<div id="root"></div>

		<script src="/bundle.js"></script>
	</body>
	</html>`

	res.status(200).end(appHTML)

})
var port = process.env.PORT || 3000;
app.listen( port, function () {
    console.log('app listening on port ' + port + '\n');
});

		