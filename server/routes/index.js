const router = require('express').Router();

// api/auth
router.use('/api/auth', require('./api/auth'));

module.exports = router;
