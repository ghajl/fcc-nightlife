import mongoose from "mongoose"
import passport from "passport"
import User from "../models/user"
import Place from "../models/place"

export function login(req, res, next) {
	passport.authenticate("local", function(err, user, info) {		
		// console.log(user);
		if(err) return next(err)
		if(!user) {
			return res.sendStatus(401);		
		}
		req.logIn(user, loginErr => {
			if(loginErr) {
				return res.sendStatus(401);
			}
			// console.log(user)
			return  res.json({userID:user._id});
		})
	})(req, res, next)
}

// -------------------------------------------

export function logout(req, res, next) {
	// the logout method is added to the request object automatically by Passport
	// console.log("out")
	req.logout()
	return res.sendStatus(200);
}

export function addPlace(req, res, next) {
	
	Place.findOneAndUpdate({placeID: req.body.placeID}, {$addToSet: { users: req.body.username } }, 
							{upsert: true}, (err) => { 
								if (err) {
									return res.sendStatus(401);
								}
								User.update({username: req.body.username}, {$addToSet: { places: req.body.placeID } },(err) => {
									if (err) {
										Place.update({placeID: req.body.placeID},{$pull: { users: req.body.username } }, (err) => {
											if (err) {
												return res.sendStatus(401);
											}
										})
										return res.sendStatus(401);
									}
									return res.sendStatus(200);
								})
							})
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
			newUser.save((err, user) => {
				if (err) {
					
					return res.sendStatus(401);
				}
				// console.log(user)
				return res.json({userID:user._id});
			})
		}
	})

}