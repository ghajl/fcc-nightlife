
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

// TODO: two phase commit
async function addUserToBar(req, res) {
  const { userID, placeID } = req.body;
  try {
    await Place.findOneAndUpdate({ placeID }, { $addToSet: { users: userID } }, { upsert: true });
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { places: placeID } });
    return res.sendStatus(200);
  } catch (err) {
    try {
      await Place.findOneAndUpdate({ placeID }, { $pull: { users: userID } });
      await User.findByIdAndUpdate(req.user.id, { $pull: { places: placeID } });
      return res.sendStatus(409);
    } catch (e) {
      return res.sendStatus(409);
    }
  }
}

async function removeUserFromBar(req, res) {
  const { userID, placeID } = req.body;
  try {
    await Place.findOneAndUpdate({ placeID }, { $pull: { users: userID } });
    await User.findByIdAndUpdate(req.user.id, { $pull: { places: placeID } });
    return res.sendStatus(200);
  } catch (err) {
    try {
      await Place.findOneAndUpdate({ placeID }, { $addToSet: { users: userID } });
      await User.findByIdAndUpdate(req.user.id, { $addToSet: { places: placeID } });
      return res.sendStatus(409);
    } catch (e) {
      return res.sendStatus(409);
    }
  }
}

// user adds/removes himself to/from the list of users that are going to the bar -
// add/remove username to/from list of users in Place and
// add/remove place id to/from list of places in User
export function modifyPlaceList(req, res) {
  if (!req.isAuthenticated()) return res.sendStatus(401); // user logged out on another tab
  if (req.user.id !== req.body.userID) {
    return res.sendStatus(403); // user logged in to another account on different tab
  }
  if (req.body.operation === 'ADD') {
    return addUserToBar(req, res);
  }
  if (req.body.operation === 'REMOVE') {
    return removeUserFromBar(req, res);
  }
  return res.sendStatus(400);
}


export async function register(req, res) {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  try {
    const user = await User.findOne({ username });
    // is username already in use?
    if (user) {
      return res.sendStatus(409);
    }
    // create the new user
    const newuser = await newUser.save();
    return req.logIn(newuser, (loginErr) => {
      if (loginErr) {
        return res.sendStatus(401);
      }
      return res.json({ userID: newuser.id });
    });
  } catch (err) {
    return res.sendStatus(401);
  }
}

// returns - if exist - list of guests of bars on page
export async function getUsersBarsData(req, res) {
  const { bars } = req.query;
  if (bars == null) return res.sendStatus(400);
  if (req.user == null) return res.sendStatus(401);
  try {
    const locationPlaces = await Place.find({ placeID: { $in: bars } }, 'placeID users');
    let currentUserBars = [];
    currentUserBars = bars.filter(barID => req.user.places.indexOf(barID) !== -1);
    const { username = null, profile = null, id } = req.user;
    const placesUsersData = locationPlaces.map(place => (
      { placeID: place.placeID, users: place.users.length }
    ));

    return res.json({
      placesUsersData,
      currentUserBars,
      username,
      profile,
      userID: id,
    });
  } catch (err) {
    return res.sendStatus(409);
  }
}

export function getUserData(req, res) {
  if (!req.user) {
    return res.sendStatus(401);
  }
  const { username, profile, id } = req.user;
  return res.json({ username, profile, userID: id });
}

export async function getUsersList(req, res) {
  const { placeID } = req.query;
  if (placeID == null) return res.sendStatus(400);
  try {
    const data = await Place.findOne({ placeID }, 'users');
    if (data.users == null || data.users.length === 0) {
      throw new Error('no data');
    }
    const users = await User.find({ _id: { $in: data.users } });
    const result = users.map((userdata) => {
      if (userdata.profile != null
        && (userdata.profile.givenName != null || userdata.profile.familyName != null)) {
        return `${userdata.profile.givenName} ${userdata.profile.familyName}`;
      }
      if (userdata.username != null) {
        return userdata.username;
      }
      return 'guest';
    });
    return res.json({ users: result });
  } catch (err) {
    return res.sendStatus(409);
  }
}
