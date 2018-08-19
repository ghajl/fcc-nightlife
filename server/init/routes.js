import {
  login,
  logout,
  register,
  getUserData,
  getVisitorsList,
  addBar,
  removeBar,
  getUserPlacesData,
  getUserBasket,
} from '../controllers/users';

export default (app, passport) => {
  app.post('/login', login);
  app.get('/logout', logout);
  app.post('/signup', register);
  app.post('/addBar', addBar);
  app.post('/removeBar', removeBar);
  app.get('/currentUserPlacesData', getUserPlacesData);
  app.get('/currentUser', getUserData);
  app.get('/currentUserBasket', getUserBasket);
  app.get('/visitors', getVisitorsList);
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signup' }), (req, res) => {
    res.redirect('/return-from-success-login');
  });
};
