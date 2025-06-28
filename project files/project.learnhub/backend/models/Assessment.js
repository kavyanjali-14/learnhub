import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  title: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  questions: [String],
  dueDate: Date,
});

const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment; 