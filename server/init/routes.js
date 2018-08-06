import {
  login, logout, register, modifyPlaceList, getBarsData, getUserData, getVisitorsList,
} from '../controllers/users';

export default (app, passport) => {
  app.post('/login', login);
  app.get('/logout', logout);
  app.post('/signup', register);
  app.post('/places', modifyPlaceList);
  app.get('/data', getBarsData);
  app.get('/user', getUserData);
  app.get('/visitors', getVisitorsList);
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signup' }), (req, res) => {
    res.redirect('/return-from-success-login');
  });
};
