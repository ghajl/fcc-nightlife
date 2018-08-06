import mongoose from 'mongoose';

const BarSchema = new mongoose.Schema({
  barID: {
    type: String,
    unique: true,
  },
  users: [String],
});

const Bar = mongoose.model('Bar', BarSchema);
export default Bar;
