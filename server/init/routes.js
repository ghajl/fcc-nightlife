import {login, logout, register, modifyPlaceList, getUsersBarsData} from "../controllers/users"


export default (app) => {
	app.post("/login", login);
	app.get("/logout", logout);
	app.post("/signup", register);
	app.post("/places", modifyPlaceList);
	app.get("/data", getUsersBarsData);
	
}