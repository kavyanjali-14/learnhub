import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  teacher: String, // or mongoose.Schema.Types.ObjectId if referencing a User
});

const Course = mongoose.model('Course', courseSchema);
export default Course; 