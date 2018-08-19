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
      return res.json({ bars: user.bars, userId: user.id });
    });
  })(req, res, next);
}

// -------------------------------------------

export function logout(req, res) {
  // the logout method is added to the request object automatically by Passport
  req.logout();
  return res.sendStatus(200);
}

export async function addBar(req, res) {
  if (!req.isAuthenticated()) return res.sendStatus(401); // user logged out on another tab
  if (req.user.id !== req.body.userId) {
    return res.sendStatus(403); // user logged in to another account on different tab
  }
  const { userId, barId, placeId } = req.body;
  try {
    await Bar.findOneAndUpdate(
      { barId },
      { $addToSet: { users: userId }, placeId }, { upsert: true },
    );
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { bars: barId } });
    return res.sendStatus(200);
  } catch (err) {
    try {
      await Bar.findOneAndUpdate({ barId }, { $pull: { users: userId } });
      await User.findByIdAndUpdate(req.user.id, { $pull: { bars: barId } });
      return res.sendStatus(409);
    } catch (e) {
      return res.sendStatus(409);
    }
  }
}

export async function removeBar(req, res) {
  if (!req.isAuthenticated()) return res.sendStatus(401); // user logged out on another tab
  if (req.user.id !== req.body.userId) {
    return res.sendStatus(403); // user logged in to another account on different tab
  }
  const { userId, barId, placeId } = req.body;
  try {
    await Bar.findOneAndUpdate({ barId }, { $pull: { users: userId } });
    await User.findByIdAndUpdate(req.user.id, { $pull: { bars: barId } });
    return res.sendStatus(200);
  } catch (err) {
    try {
      await Bar.findOneAndUpdate({ barId }, { $addToSet: { users: userId }, placeId });
      await User.findByIdAndUpdate(req.user.id, { $addToSet: { bars: barId } });
      return res.sendStatus(409);
    } catch (e) {
      return res.sendStatus(409);
    }
  }
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
      return res.json({ userId: newuser.id });
    });
  } catch (err) {
    return res.sendStatus(401);
  }
}

// returns number of visitors of each bar on page
// and list of bars of current user
export async function getUserPlacesData(req, res) {
  const { bars } = req.query;
  if (bars == null) return res.sendStatus(400);
  try {
    const found = await Bar.find({ barId: { $in: bars } }, 'barId users');
    const visitors = found.map(bar => (
      { barId: bar.barId, count: bar.users.length }
    ));
    const {
      username = null, profile = null, id = null, bars: currentUserBars = null,
    } = req.user || {};
    return res.json({
      visitors,
      currentUserBars,
      username,
      profile,
      userId: id,
    });
  } catch (err) {
    return res.sendStatus(409);
  }
}

export async function getUserData(req, res) {
  if (!req.user) {
    return res.sendStatus(401);
  }
  const {
    username, profile, id, bars,
  } = req.user;
  try {
    return res.json({
      username, profile, userId: id, bars,
    });
  } catch (err) {
    return res.sendStatus(409);
  }
}

export async function getVisitorsList(req, res) {
  const { barId } = req.query;
  if (barId == null) return res.sendStatus(400);
  try {
    const data = await Bar.findOne({ barId }, 'users');
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

export async function getUserBasket(req, res) {
  if (!req.user) {
    return res.sendStatus(401);
  }
  const {
    username, profile, id, bars,
  } = req.user;
  try {
    const found = await Bar.find({ barId: { $in: bars } }, 'barId placeId');
    const currentUserBars = found.map((bar) => {
      const { barId, placeId } = bar;
      return { barId, placeId };
    });
    return res.json({
      currentUserBars,
      username,
      profile,
      userId: id,
    });
  } catch (err) {
    return res.sendStatus(409);
  }
}
