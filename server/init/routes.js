import users from "../controllers/users"


export default (app) => {
	app.post("/login", users.login);
	app.get("/logout", users.logout);
	app.post("/register", users.register);
}