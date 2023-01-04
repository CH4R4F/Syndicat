const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['vacant', 'occupied'],
    default: 'vacant',
  },
});

module.exports = mongoose.model('Apartment', apartmentSchema);
