import passport from 'passport';
import User from '../models/user';
import Place from '../models/place';

export function login(req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.sendStatus(401);
    }
    return req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.sendStatus(401);
      }
      const currentBars = req.body.places;
      const currentUserBars = currentBars.filter(barID => user.places.indexOf(barID) !== -1);
      return res.json({ places: currentUserBars, userID: user.id });
    });
  })(req, res, next);
}

// -------------------------------------------

export function logout(req, res) {
  // the logout method is added to the request object automatically by Passport
  req.logout();
  return res.sendStatus(200);
}


// user adds/removes himself to/from the list of users that are going to the bar -
// add/remove username to/from list of users in Place and
// add/remove place id to/from list of places in User
export function modifyPlaceList(req, res) {
  if (!req.isAuthenticated()) return res.sendStatus(401); // user logged out on another tab
  if (req.user.id !== req.body.userID) {
    return res.sendStatus(403); // user logged in to another account on different tab
  }
  const barUsersData = { users: req.body.userID };

  if (req.body.operation === 'ADD') {
    Place.findOneAndUpdate({ placeID: req.body.placeID }, { $addToSet: barUsersData }, { upsert: true }, (err) => {
      if (err) {
        return res.sendStatus(409);
      }
      
      User.findByIdAndUpdate(req.user.id, {$addToSet: { places: req.body.placeID } }, (err) => {
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
    Place.findOneAndUpdate({placeID: req.body.placeID}, {$pull: barUsersData }, (err) => { 
      if (err) {
        return res.sendStatus(409);
      }
      User.findByIdAndUpdate(req.user.id, {$pull: { places: req.body.placeID } },(err) => {
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
        return res.json({userID: user.id});
      });
    })
  })
}

//returns - if exist - users lists of bars currently found by search on client
export function getUsersBarsData(req, res) {
  if (!req.query.bars) return res.sendStatus(400);
  
  const { bars } = req.query;

  Place.find( {placeID: { $in: bars }}, 'placeID users', (err, locationPlaces) => {
    if (err) {
      return res.sendStatus(409);
    }
    let currentUserBars = [], username = null, profile = null, id = null;
    if (req.user != null) {
      currentUserBars = req.query.bars.filter(barID => req.user.places.indexOf(barID) != -1);
      ({username = null, profile = null, id} = req.user);
    }
    const placesUsersData = locationPlaces.map(place => ({placeID: place.placeID, users: place.users.length}));

    return res.json({placesUsersData, currentUserBars, username, profile, userID: id});
  } )
  
}

export function getUserData(req, res) {
  if(!req.user){
    return res.sendStatus(401);
  }
  const {username, profile, id} = req.user;
  
  return res.json({username, profile, userID: id});
}

export function getUsersList(req, res) {
  if(!req.query.placeID) return res.sendStatus(400);
  
  Place.findOne({ placeID: req.query.placeID }, 'users', (err, data) => {
    if (err) {
      console.log(err)
      return res.sendStatus(409);
      
    }
    
    if(data.users && data.users.length){
      User.find({ _id: { $in: data.users}}, (err, users) => {
        if (err) {
        console.log(err)
          return res.sendStatus(409);
          
        }
        const result = users.map(userdata => userdata.facebookID ? `${userdata.profile.givenName} ${userdata.profile.familyName}` 
                                      : userdata.username);
        return res.json({users: result});
      })
    } else {
      console.log("didn't find users")
      return res.sendStatus(409);
    }
    
    
  });
}