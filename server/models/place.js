import bcrypt from "bcrypt-nodejs";
import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const PlaceSchema = new mongoose.Schema({
	placeID: {
		type: String,
		unique: true	
	},
	users: [String],
	facebookUsers: [String]
})


const Place = mongoose.model('Place', PlaceSchema);
export default Place;