import {login, logout, register, modifyPlaceList, getUsersBarsData, getUserData, getUsersList} from "../controllers/users"


export default (app, passport) => {
  app.post("/login", login);
  app.get("/logout", logout);
  app.post("/signup", register);
  app.post("/places", modifyPlaceList);
  app.get("/data", getUsersBarsData);
  app.get("/user", getUserData);
  app.get('/userslist', getUsersList);
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signup' }), (req, res) => {
    res.redirect('/return-from-success-login');
  });
}

