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

export function logout(req, res) {
	// the logout method is added to the request object automatically by Passport
	req.logout()
	return res.sendStatus(200);
}


//user adds/removes himself to/from the list of users that are going to the bar -
//add/remove username to/from list of users in Place and
//add/remove place id to/from list of places in User
export function modifyPlaceList(req, res) {
	if(!req.isAuthenticated()) return res.sendStatus(401); //user logged out on another tab
	if((req.user.username != null && req.body.username != null && req.user.username !== req.body.username) ||
		(req.user.facebookID != null && req.body.facebookID != null && req.user.facebookID !== req.body.facebookID)) return res.sendStatus(403); //user logged in to another account on different tab
	const barUsersData = req.body.facebookID != null ? { facebookUsers: req.body.facebookID } : { users: req.body.username };
	const userData = req.body.facebookID != null ? { facebookID: req.body.facebookID } : { username: req.body.username };
	if(req.body.operation === 'ADD'){
		Place.findOneAndUpdate({placeID: req.body.placeID}, {$addToSet: barUsersData }, 
								{upsert: true}, (err) => { 
									if (err) {
										return res.sendStatus(409);
									}
									User.update(userData, {$addToSet: { places: req.body.placeID } },(err) => {
										if (err) {
											Place.update({placeID: req.body.placeID},{$pull: barUsersData }, (err) => {
												if (err) {
													return res.sendStatus(409);
												}
											})
											return res.sendStatus(409);
										}
										return res.sendStatus(200);
									})
								})
	} else if (req.body.operation === 'REMOVE') {
		Place.findOneAndUpdate({placeID: req.body.placeID}, {$pull: barUsersData }, 
								(err) => { 
									if (err) {
										return res.sendStatus(409);
									}
									User.update(userData, {$pull: { places: req.body.placeID } },(err) => {
										if (err) {
											Place.update({placeID: req.body.placeID},{$addToSet: barUsersData }, (err) => {
												if (err) {
													return res.sendStatus(409);
												}
											})
											return res.sendStatus(409);
										}
										return res.sendStatus(200);
									})
								})
	} else {
		return res.sendStatus(400);
	}
}

export function register(req, res) {
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
export function getUsersBarsData(req, res) {
	if(!req.query.bars) return res.sendStatus(400);
	const { bars } = req.query;
	Place.find( {placeID: { $in: bars }}, 'placeID users facebookUsers', (err, locationPlaces) => {
		if (err) {
			return res.sendStatus(409);
		}
		const username = req.user && req.user.username || null,
			profile = req.user && req.user.profile || null,
			facebookID = req.user && req.user.facebookID || null,
			userPlaces = req.user && req.user.places || null;
		
		return res.json({locationPlaces, username , facebookID, profile, userPlaces});
	} )
	
}

export function getUserData(req, res) {
	if(!req.user){
		return res.sendStatus(401);
	}
	console.log(req.user)
	const {places, username, profile, facebookID} = req.user;
	return res.json({places, username, profile, facebookID});
}