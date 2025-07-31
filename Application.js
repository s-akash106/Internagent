import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  company: String,
  role: String,
  status: { type: String, default: 'Applied' },
  dateApplied: { type: Date, default: Date.now }
});

export default mongoose.model('Application', schema);