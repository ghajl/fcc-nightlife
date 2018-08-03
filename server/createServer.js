import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import session from 'express-session';
import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import initRoutes from './init/routes';
import User from './models/user';
import { isDebug } from '../config/app';

const cors = require('cors');
const cookieParser = require('cookie-parser');

const server = (appConfig = {}) => {
  const app = express();

  let config = null;
  if (isDebug) {
    config = require('./config').default;
  }

  const mongoDB = process.env.MONGOLAB_URI || config.MONGOLAB_URI;
  const mongoOptions = {
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
  };
  const connect = () => {
    mongoose.connect(mongoDB, mongoOptions, (err) => {
      if (err) {
        console.log('Error connecting');
      } else {
        console.log('Successfully connected');
      }
    });
  };
  connect();
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error);
  db.on('disconnected', connect);

  passport.use(new LocalStrategy((username, password, cb) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false, { message: 'User not found' });
      }
      return user.comparePassword(password, (usererr, isMatch) => {
        if (isMatch) {
          return cb(null, user);
        }
        return cb(null, false, { message: 'Invalid username or password' });
      });
    });
  }));

  const facebookId = process.env.FACEBOOK_APP_ID || config.FACEBOOK_APP_ID;
  const facebookSecret = process.env.FACEBOOK_APP_SECRET || config.FACEBOOK_APP_SECRET;
  passport.use(new FacebookStrategy(
    {
      clientID: facebookId,
      clientSecret: facebookSecret,
      callbackURL: 'https://fcc-barcoordinator.herokuapp.com/auth/facebook/callback',
      profileFields: ['id', 'name'],
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ facebookID: profile.id }, (err, user) => {
        if (err) {
          return cb(err);
        }
        if (user) {
          return cb(null, user);
        }
        const newUser = new User();
        newUser.facebookID = profile.id;
        newUser.profile.givenName = (profile.name && profile.name.givenName) || '';
        newUser.profile.familyName = (profile.name && profile.name.familyName) || '';
        return newUser.save((usererr) => {
          cb(usererr, newUser);
        });
      });
    },
  ));


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  const MongoStore = connectMongo(session);

  app.use(cookieParser());

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
      autoReconnect: true,
    }),
  }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
  app.options('*', cors());

  const rootDir = appConfig.root || process.cwd();

  app.get('/privacypolicy', (req, res) => {
    res.sendFile(`${rootDir}/public/privacypolicy.htm`);
  });
  app.use('/public', express.static(`${rootDir}/public`));
  app.use('/dist', express.static(`${rootDir}/dist`));

  initRoutes(app, passport);

  const appHTML = `${rootDir}/dist/index.html`;

  app.all('*', (req, res) => {
    res.sendFile(appHTML);
  });

  if (appConfig.port) {
    app.listen(appConfig.port, () => {
      console.log(`app listening on port ${appConfig.port}\n`);
    });
  }

  return app;
};

const createServer = () => ({
  withConfig: config => server(config),
});

export default createServer;
