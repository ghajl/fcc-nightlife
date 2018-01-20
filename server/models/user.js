import bcrypt from "bcrypt-nodejs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: { 
		type: String,
		unique: true
	},
	password: String,
	places:[String]	
})



UserSchema.pre("save", function(next) {
	var user = this;

	if (!user.isModified("password")) return next()

	bcrypt.genSalt(5, (err, salt) => {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err)
				// console.log("user");
			user.password = hash

			next()
		})
	})
})
UserSchema.methods = {
 	comparePassword: function(candidatePassword, cb) {
 		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
 			if (err) return cb(err)
 			cb(null, isMatch)
 		})
 	}
}
const User = mongoose.model('User', UserSchema);
export default User;