const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: { type: String, required: true },
  severity: { type: String, required: true },
  priority: { type: Number, required: true },
  status: { type: String, default: 'open' },
  geoLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  victimId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Victim'
  },
  volunteersAssigned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', problemSchema);
