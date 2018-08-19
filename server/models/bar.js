import mongoose from 'mongoose';

const BarSchema = new mongoose.Schema({
  barId: {
    type: String,
    unique: true,
  },
  placeId: {
    type: String,
    unique: true,
  },
  users: [String],
});

const Bar = mongoose.model('Bar', BarSchema);
export default Bar;
