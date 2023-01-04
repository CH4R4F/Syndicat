const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
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
  },
});

module.exports = mongoose.model('Apartment', apartmentSchema);
