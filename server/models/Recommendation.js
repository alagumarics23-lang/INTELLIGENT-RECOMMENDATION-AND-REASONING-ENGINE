const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  reasoning: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
