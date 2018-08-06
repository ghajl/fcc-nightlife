import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: String,
  bars: [String],
  profile: {
    givenName: String,
    familyName: String,
  },
  facebookID: {
    type: String,
    unique: true,
    sparse: true,
  },
});

UserSchema.pre('save', function presave(next) {
  const user = this;

  if (!user.isModified('password')) {
    next();
    return;
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err);
      return;
    }
    bcrypt.hash(user.password, salt, null, (herr, hash) => {
      if (herr) {
        next(herr);
        return;
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods = {
  comparePassword: function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, isMatch);
    });
  },
};

const User = mongoose.model('User', UserSchema);
export default User;
