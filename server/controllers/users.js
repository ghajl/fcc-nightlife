import mongoose from "mongoose"
import passport from "passport"
import User from "../models/user"


export function login(req, res, next) {
	passport.authenticate("local", function(err, user, info) {		
		console.log(user);
		if(err) return next(err)
		if(!user) {
			return res.sendStatus(401);		
		}
		req.logIn(user, loginErr => {
			if(loginErr) {
				return res.sendStatus(401);
			}
			return  res.sendStatus(200);
		})
	})(req, res, next)
}

// -------------------------------------------

export function logout(req, res, next) {
	// the logout method is added to the request object automatically by Passport
	console.log("out")
	req.logout()
	return res.sendStatus(200);
}

// -------------------------------------------
export function addPlace(req, res, next) {
	// the logout method is added to the request object automatically by Passport
	console.log("out")
	// req.logout()
	return res.sendStatus(200);
}

export function register(req, res, next) {
	const newUser = new User({
	    username: req.body.username,
	    password: req.body.password
	});	
	User.findOne({ username: req.body.username }, (err, user) => {
		// is username already in use?
		if (user) {			
			
			return res.sendStatus(409);
		}
		// go ahead and create the new user
		else {
			newUser.save((err) => {
				if (err) {
					
					return res.sendStatus(401);
				}
				
				return res.sendStatus(200);
			})
		}
	})

}