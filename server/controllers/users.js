
import passport from 'passport';
import User from '../models/user';
import Bar from '../models/bar';


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
      const currentBars = req.body.bars;
      const currentUserBars = currentBars.filter(barID => user.bars.indexOf(barID) !== -1);
      return res.json({ bars: currentUserBars, userID: user.id });
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
  const { userID, barID } = req.body;
  try {
    await Bar.findOneAndUpdate({ barID }, { $addToSet: { users: userID } }, { upsert: true });
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { bars: barID } });
    return res.sendStatus(200);
  } catch (err) {
    try {
      await Bar.findOneAndUpdate({ barID }, { $pull: { users: userID } });
      await User.findByIdAndUpdate(req.user.id, { $pull: { bars: barID } });
      return res.sendStatus(409);
    } catch (e) {
      return res.sendStatus(409);
    }
  }
}

async function removeUserFromBar(req, res) {
  const { userID, barID } = req.body;
  try {
    await Bar.findOneAndUpdate({ barID }, { $pull: { users: userID } });
    await User.findByIdAndUpdate(req.user.id, { $pull: { bars: barID } });
    return res.sendStatus(200);
  } catch (err) {
    try {
      await Bar.findOneAndUpdate({ barID }, { $addToSet: { users: userID } });
      await User.findByIdAndUpdate(req.user.id, { $addToSet: { bars: barID } });
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

// returns number of visitors of each bar on page
// and list of bars of current user
export async function getBarsData(req, res) {
  const { bars } = req.query;
  if (bars == null) return res.sendStatus(400);
  try {
    const found = await Bar.find({ barID: { $in: bars } }, 'barID users');
    const visitors = found.map(bar => (
      { barID: bar.barID, count: bar.users.length }
    ));
    const { username = null, profile = null, id = null } = req.user || {};
    let currentUserBars = [];
    if (req.user != null) {
      currentUserBars = bars.filter(barID => req.user.bars.indexOf(barID) !== -1);
    }
    return res.json({
      visitors,
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

export async function getVisitorsList(req, res) {
  const { barID } = req.query;
  if (barID == null) return res.sendStatus(400);
  try {
    const data = await Bar.findOne({ barID }, 'users');
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
    return res.json({ visitors: result });
  } catch (err) {
    return res.sendStatus(409);
  }
}
