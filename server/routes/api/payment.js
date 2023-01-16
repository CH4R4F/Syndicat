const router = require('express').Router();
const { getAllPayments, addPayment, removePayment, getPaymentById } = require('../../controllers/payment');

router.route('/').get(getAllPayments).post(addPayment);
router.route('/:id').get(getPaymentById).delete(removePayment);

module.exports = router;
