import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  instructor: String, // or mongoose.Schema.Types.ObjectId if referencing a User
});

const Workshop = mongoose.model('Workshop', workshopSchema);
export default Workshop; 