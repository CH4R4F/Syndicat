const Tenant = require('../../models/user');
const Apartment = require('../../models/apartment');
const Building = require('../../models/building');
const Payment = require('../../models/payment');
const express = require('express');
const router = express.Router();

// @route   GET api/statistics
// @desc    Get statistics
// @access  Private
router.get('/', async (req, res) => {
  try {
    const tenants = await Tenant.find({ role: 'tenant' });
    const apartments = await Apartment.find();
    const buildings = await Building.find();
    const payments = await Payment.find();

    const statistics = {
      tenants: tenants.length,
      apartments: apartments.length,
      buildings: buildings.length,
      payments: payments.length,
    };

    res.json(statistics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
