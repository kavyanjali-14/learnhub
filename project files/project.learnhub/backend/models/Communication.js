import mongoose from 'mongoose';

const communicationSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  date: { type: Date, default: Date.now },
});

const Communication = mongoose.model('Communication', communicationSchema);
export default Communication; 