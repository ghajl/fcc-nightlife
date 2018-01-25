import mongoose from "mongoose"
import passport from "passport"
import User from "../models/user"
import Place from "../models/place"
import axios from "axios";
import fetch from 'isomorphic-unfetch'

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
			return  res.json({places:user.places});
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

export function modifyPlaceList(req, res, next) {
	
	if(req.body.operation === 'ADD'){
		console.log("1")
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
										console.log("2")
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
		// go ahead and create the new user
		else {
			newUser.save((err, user) => {
				if (err) {
					
					return res.sendStatus(401);
				}
				// console.log(user)
				return res.sendStatus(200);
			})
		}
	})

}

export function getUsersBarsData(req, res, next) {
	// console.log("req.query")
	const { bars } = req.query;
	console.log(bars)
	Place.find( {placeID: { $in: bars }}, 'placeID users', (err, docs) => {
		if (err) {
			return res.sendStatus(401);
		}
		console.log(docs)
		return res.json({places: docs});
	} )
	
}

export function getPhoto(req, res, next) {
	// console.log("req.query")
	const { ref } = req.query;
	console.log(ref)
	// url:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=x&key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo',
	// axios({
	// 	  method:'get',
	// 	  url:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo`,
	// 	  withCredentials: true,
	// 	})
	// 	  .then(function(response) {
	// 	  	console.log(response)
	// 	  	return res.sendStatus(200);
	// 	  	}	  ).catch((err) => {
	// 						        console.log(err);
	// 						        return res.sendStatus(401);
	// 						    })
	// Place.find( {placeID: { $in: bars }}, 'placeID users', (err, docs) => {
	// 	if (err) {
	// 		return res.sendStatus(401);
	// 	}
	// 	console.log(docs)
	// 	return res.json({places: docs});
	// } )
	try{
	fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo`)
	.then(res => console.log(res));
} catch(err) {
	console.log(err)
	return res.sendStatus(401);
}
}