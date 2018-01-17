import {login, logout, register, addPlace} from "../controllers/users"


export default (app) => {
	app.post("/login", login);
	app.get("/logout", logout);
	app.post("/signup", register);
	app.post("/places", addPlace)
}