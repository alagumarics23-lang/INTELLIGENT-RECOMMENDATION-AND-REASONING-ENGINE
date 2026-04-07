const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    type: [String],
    default: [],
  },
  department: { type: String, default: '' },
  cgpa: { type: Number, default: 0 },
  projectsCompleted: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  certifications: { type: [String], default: [] },
  areaOfInterest: { type: [String], default: [] },
  lackOfKnowledge: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
