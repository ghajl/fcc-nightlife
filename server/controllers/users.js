import mongoose from "mongoose"
import passport from "passport"
import User from "../models/user"
import Place from "../models/place"
import axios from "axios";
import fetch from 'isomorphic-unfetch'

export function login(req, res, next) {
	passport.authenticate("local", function(err, user, info) {		
		if(err) return next(err)
		if(!user) {
			return res.sendStatus(401);		
		}
		return req.logIn(user, loginErr => {
			if(loginErr) {
				return res.sendStatus(401);
			}
			return  res.json({places:user.places});
		})
	})(req, res, next)
}

// -------------------------------------------

export function logout(req, res, next) {
	// the logout method is added to the request object automatically by Passport
	req.logout()
	return res.sendStatus(200);
}


//user adds/removes himself to/from the list of users that are going to the bar -
//add/remove username to/from list of users in Place and
//add/remove place id to/from list of places in User
export function modifyPlaceList(req, res, next) {
	
	if(req.body.operation === 'ADD'){
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
	} else if (req.body.operation === 'REMOVE') {
		Place.findOneAndUpdate({placeID: req.body.placeID}, {$pull: { users: req.body.username } }, 
								(err) => { 
									if (err) {
										return res.sendStatus(401);
									}
									User.update({username: req.body.username}, {$pull: { places: req.body.placeID } },(err) => {
										if (err) {
											Place.update({placeID: req.body.placeID},{$addToSet: { users: req.body.username } }, (err) => {
												if (err) {
													return res.sendStatus(401);
												}
											})
											return res.sendStatus(401);
										}
										return res.sendStatus(200);
									})
								})
	} else {
		return res.sendStatus(401);
	}
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
		// create the new user
		
		return newUser.save((err, user) => {
			if (err) {
				
				return res.sendStatus(401);
			}
			return req.logIn(user, (loginErr) => {
		        if (loginErr) return res.sendStatus(401);
		        return res.sendStatus(200);
	        });
			
		})
		
	})

}

//returns - if exist - users lists of bars currently found by search on client
export function getUsersBarsData(req, res, next) {
	console.log(req.user)
	console.log(req.session)
	if(!req.query.bars) return res.sendStatus(401);
	const { bars } = req.query;
	Place.find( {placeID: { $in: bars }}, 'placeID users', (err, docs) => {
		if (err) {
			return res.sendStatus(401);
		}
		return res.json({places: docs});
	} )
	
}

