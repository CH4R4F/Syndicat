const Payment = require('../models/payment');

/**
 * @route api/payment
 * @method GET
 * @access PRIVATE
 * @description get all payments details
 */
const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({}).populate('apartment');

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route api/payment/:id
 * @method GET
 * @access PRIVATE
 * @description get payment by id
 */
const getPaymentById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findOne({ _id: id });

    if (!payment) {
      throw new Error('payment not found');
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route api/payment
 * @method POST
 * @access PRIVATE
 * @description add new payment
 */
const addPayment = async (req, res, next) => {
  const { amount, date, apartment, tenant } = req.body;

  try {
    if (!amount || !date || !apartment || !tenant) {
      throw new Error('please add all required fields');
    }

    const newPayment = new Payment({
      amount,
      date,
      apartment,
      tenant,
    });
    await newPayment.save();

    res.status(201).json({
      success: true,
      message: 'payment added successfully',
      newPayment,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route api/payment/:id
 * @method DELETE
 * @access PRIVATE
 * @description delete payment
 */
const removePayment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findOneAndDelete({ _id: id });

    if (!payment) {
      throw new Error('payment not found');
    }

    res.status(200).json({
      success: true,
      message: 'payment deleted successfully',
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = {
  getAllPayments,
  addPayment,
  removePayment,
  getPaymentById,
};
