const User = require('../models/user');

/**
 * @route /api/tenants
 * @method GET
 * @access PRIVATE
 * @description get all the tanants' details
 */
const getAllTenants = async (req, res, next) => {
  try {
    const tenants = await User.find();

    res.status(200).json({
      success: true,
      tenants,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

/**
 * @route /api/tenants
 * @method POST
 * @access PRIVATE
 * @description add a new tenant
 */
const addTenant = async (req, res, next) => {
  const { firstName, lastName, CIN, telephone } = req.body;

  try {
    if (!firstName || !lastName || !CIN || !telephone) {
      throw new Error('please add all required fields');
    }

    // create the tenant
    const newTenant = await User.create({
      firstName,
      lastName,
      CIN,
      telephone,
    });

    res.status(200).json({
      success: true,
      tenant: newTenant,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route /api/tenants/:id
 * @method GET
 * @access PRIVATE
 * @description get a single tenant
 */
const getTenantDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tenant = await User.find({ _id: id });
    if (!tenant) {
      throw new Error('tenant not found');
    }

    res.status(200).json({
      success: true,
      tenant,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route /api/tenants/:id
 * @method PUT
 * @access PRIVATE
 * @description update an existing tenant
 */
const updateTenant = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, CIN, telephone } = req.body;

  try {
    if (!firstName || !lastName || !CIN || !telephone) {
      throw new Error('please add all required fields');
    }
    const tenant = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          firstName,
          lastName,
          CIN,
          telephone,
        },
      }
    );

    if (!tenant) {
      throw new Error('tenant not found');
    }

    res.status(200).json({
      success: true,
      tenant,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route /api/tenants/:id
 * @method DELETE
 * @access PRIVATE
 * @description deletes an tenant
 */
const removeTenant = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tenant = await User.findOneAndDelete({ _id: id });

    if (!tenant) {
      throw new Error('no tenant found');
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = {
  getAllTenants,
  getTenantDetails,
  addTenant,
  updateTenant,
  removeTenant,
};
