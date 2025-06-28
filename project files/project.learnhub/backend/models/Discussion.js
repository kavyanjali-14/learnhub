import mongoose from 'mongoose';

const discussionSchema = new mongoose.Schema({
  topic: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const Discussion = mongoose.model('Discussion', discussionSchema);
export default Discussion; 