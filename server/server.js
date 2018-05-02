import express from "express";
import mongoose from "mongoose";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.js';
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as FacebookStrategy} from 'passport-facebook';
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
    config = require("./config").config;
	app.use(webpackDevMiddleware(compiler, {
	    publicPath: webpackConfig.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler));
	app.use(cors({
	    origin: 'http://localhost:3000/',
	    credentials: true
	}));
}

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/dist', express.static(process.cwd() + '/dist'));
const mongoDB = process.env.MONGOLAB_URI || config.MONGOLAB_URI;
const mongoOptions = {
  useMongoClient: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
};
const connect = () => {
	mongoose.connect(mongoDB, mongoOptions, (err, res) => {
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
const facebookId = process.env.FACEBOOK_APP_ID || config.FACEBOOK_APP_ID;
const facebookSecret = process.env.FACEBOOK_APP_SECRET || config.FACEBOOK_APP_SECRET;
passport.use(new FacebookStrategy({
    clientID: facebookId,
    clientSecret: facebookSecret,
    callbackURL: 'https://fcc-barcoordinator.herokuapp.com/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'name']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ facebookID: profile.id }, function (err, user) {
    	if(err) { 
    		console.log(err);
    		return cb(err); 
    	}
    	if(user) {
    		return cb(null, user);
    	}
      	const newUser = new User();
      	newUser.facebookID = profile.id;
      	newUser.profile.givenName = profile.name && profile.name.givenName || '';
      	newUser.profile.familyName = profile.name && profile.name.familyName || '';
      	newUser.profile.displayName = profile.displayName || 'Facebook User';
      	newUser.save((err) => {
            cb(err, newUser);
        });
    });
  }
));


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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionSecret = process.env.SESSION_SECRET || config.SESSION_SECRET;
app.use(session({ 
	secret: sessionSecret, 
	resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
	store: new MongoStore({
		url: mongoDB,
		autoReconnect: true
	})
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.options('*', cors()) ;
//save url for redirecting after successful facebook authentication
// app.use((req, res, next) => {
// 	if(req.path.match(/^\/auth/)) {
// 			req.session.returnTo = '/';
// 		}
// 	next();
// });

app.get('/privacypolicy', function(req, res) {
  res.sendFile(process.cwd() + "/public/privacypolicy.htm");
});

initRoutes(app, passport);
const bundlePath = isDev ? "/bundle.js" : "/dist/bundle.js";
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

	    <title>freeCodeCamp - Nightlife Coordination App</title>
		
	</head>
	<body>
		<div id="root"></div>

		<script src=${bundlePath}></script>
	</body>
	</html>`

	res.status(200).end(appHTML)

})
var port = process.env.PORT || 3000;
app.listen( port, function () {
    console.log('app listening on port ' + port + '\n');
});

		