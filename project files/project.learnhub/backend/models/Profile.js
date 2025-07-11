import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['student', 'teacher', 'admin'] },
  bio: String,
  additionalInfo: mongoose.Schema.Types.Mixed,
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile; 