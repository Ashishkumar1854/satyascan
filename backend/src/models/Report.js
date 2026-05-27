const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  filename: String,
  fileSize: Number,
  status: { type: String, enum: ['processing', 'complete', 'error'], default: 'processing' },
  currentStep: { type: String, default: 'parsing' },
  searchProgress: {
    done: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  trustScore: Number,
  summary: {
    verified: { type: Number, default: 0 },
    inaccurate: { type: Number, default: 0 },
    false: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  claims: [{
    claim: String,
    status: { type: String, enum: ['VERIFIED', 'INACCURATE', 'FALSE'] },
    confidence: Number,
    actualFact: String,
    explanation: String,
    sources: [{ name: String, url: String }]
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
