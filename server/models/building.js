const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  numberOfFloors: {
    type: Number,
  },
  numberOfApartments: {
    type: Number,
  },
});

module.exports = mongoose.model('Building', buildingSchema);
