const router = require('express').Router();
const protect = require('../middlewares/protect');

// api/auth
router.use('/api/auth', require('./api/auth'));

// api/apartments
router.use('/api/apartments', protect, require('./api/apartment'));

// api/buildings
router.use('/api/buildings', protect, require('./api/building'));

// api/tenants
router.use('/api/tenants', protect, require('./api/tenant'));

// api/payments
router.use('/api/payments', protect, require('./api/payment'));

// api/statistics
router.use('/api/statistics', protect, require('./api/statistics'));

module.exports = router;
