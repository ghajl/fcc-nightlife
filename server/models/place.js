import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  placeID: {
    type: String,
    unique: true,
  },
  users: [String],
});

const Place = mongoose.model('Place', PlaceSchema);
export default Place;
