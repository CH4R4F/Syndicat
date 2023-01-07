const router = require('express').Router();
const { getAllPayments, addPayment, removePayment } = require('../../controllers/payment');

router.route('/').get(getAllPayments).post(addPayment);
router.route('/:id').delete(removePayment);

module.exports = router;
