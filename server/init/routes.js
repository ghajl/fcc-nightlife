import {login, logout, register, modifyPlaceList, getUsersBarsData} from "../controllers/users"


export default (app, passport) => {
	app.post("/login", login);
	app.get("/logout", logout);
	app.post("/signup", register);
	app.post("/places", modifyPlaceList);
	app.get("/data", getUsersBarsData);
	

	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signup' }), (req, res) => {
		res.redirect(req.session.returnTo || '/');
	});
}