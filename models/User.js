import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String, // bcrypt hash
  deposit: { type: Number, default: 0 },
  role: { type: String, enum: ['buyer', 'seller'], required: true }
});

export default mongoose.model('User', userSchema);
