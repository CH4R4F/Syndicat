const router = require('express').Router();

// api/auth
router.use('/api/auth', require('./api/auth'));

// api/apartments
router.use('/api/apartments', require('./api/apartment'));

// api/buildings
router.use('/api/buildings', require('./api/building'));

module.exports = router;
