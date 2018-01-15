import {login, logout, register} from "../controllers/users"


export default (app) => {
	app.post("/login", login);
	app.get("/logout", logout);
	app.post("/signup", register);
}