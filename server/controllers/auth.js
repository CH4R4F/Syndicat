const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const jwtChecker = require('../utils/jwtChecker');

/**
 * @route   POST api/auth
 * @desc    Authenticate admin and get token
 * @access  Public
 * @method  POST
 */
const login = async (req, res, next) => {
  try {
    let error;
    const { email, password } = req.body;

    if (!email || !password) {
      error = new Error('Please enter all fields');
      throw error;
    }

    // check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      error = new Error('Invalid credentials');
      throw error;
    }

    // check if password matches
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      error = new Error('Invalid credentials');
      throw error;
    }

    // generate jwt token
    const token = jwtGenerator({ _id: admin._id, email: admin.email });

    // send token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
    });

    res.status(200).json({
      success: true,
      data: {
        admin,
      },
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
};

/**
 * @route   GET api/auth
 * @desc    Verify admin
 * @access  Private
 * @method  GET
 */
const verify = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    const decoded = jwtChecker(token);

    if (!decoded) {
      throw new Error('Invalid token');
    }

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    e.status = 401;
    next(e);
  }
};

module.exports = {
  login,
  verify,
};
