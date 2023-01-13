const jwtChecker = require('../utils/jwtChecker');
const Admin = require('../models/admin');

const protect = async (req, res, next) => {
  // get the token from the cookies
  const token = req.cookies?.token;
  const error = new Error('invalid token');
  error.status = 401;

  try {
    if (!token) {
      throw error;
    }

    // check the validation of the token
    const { email } = jwtChecker(token); // by default throws the error if not a valid token

    // check if a user has the info in token
    const user = await Admin.findOne({ email });

    if (!user) {
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
