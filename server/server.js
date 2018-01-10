import express from "express";
import mongoose from "mongoose";
import {config} from "./config";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.js';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt-nodejs";
import session from "express-session";
import connectMongo from "connect-mongo";

const app = express();
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use('/public', express.static(process.cwd() + '/public'));
const mongoDB = config.MONGOLAB_URI;
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
// mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error)
db.on("disconnected", connect)


const UserSchema = new mongoose.Schema({
	username: { 
		type: String,
		unique: true
	},
	password: String	
})

const User = mongoose.model('User', UserSchema);
UserSchema.pre("save", function(next) {
	var user = this
	if (!user.isModified("password")) return next()
	bcrypt.genSalt((err, salt) => {
		if (err) return next(err)
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
})
UserSchema.methods = {
 	comparePassword: function(candidatePassword, cb) {
 		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
 			if (err) return cb(err)
 			cb(null, isMatch)
 		})
 	}
}
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
app.listen(3000, function () {
    console.log('app listening on port 3000!\n');
});