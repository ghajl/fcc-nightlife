import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as FacebookStrategy} from 'passport-facebook';
import User from "../models/user";

export default (passport, config) => {
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
      profileFields: ['id', 'displayName', 'name', 'email']
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOne({ fb: profile.id }, function (err, user) {
      	if(err) { 
      		console.log(err);
      		return cb(err); 
      	}
      	if(user) {
      		return cb(null, user);
      	}
        	const newUser = new User();
        	console.log(profile)
        	newUser.fb = profile.id;
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

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  // app.use(passport.initialize());


}