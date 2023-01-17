const Apartment = require('../models/apartment');

/**
 * @route /api/apartments
 * @method GET
 * @access PRIVATE
 * @description get all the apartments details
 */
const getAllApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find().populate('building').populate('tenant');

    res.status(200).json({
      success: true,
      apartments,
    });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

/**
 * @route /api/apartments/:number
 * @method GET
 * @access PRIVATE
 * @description get an apartment by its number
 */
const getApartmentByNumber = async (req, res, next) => {
  const { number } = req.params;

  try {
    const apartment = await Apartment.findOne({ number }).populate('building').populate('tenant');

    if (!apartment) {
      throw new Error('No apartment found');
    }

    res.status(200).json({
      success: true,
      apartment,
    });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

/**
 * @route /api/apartments
 * @method POST
 * @access PRIVATE
 * @description adds a new apartment
 */
const addApartment = async (req, res, next) => {
  const { number, status, building, tenant } = req.body;

  try {
    // check if an apartment with that number is already exist
    const apartment = await Apartment.findOne({ number });

    // validate input
    if (!number) {
      throw new Error('please add all fields');
    }

    if (apartment) {
      throw new Error(`Apartment with number ${number} is already exist`);
    }

    // create the apartment
    const newApartment = await Apartment.create({
      number,
      building,
      tenant,
      status,
    });

    res.status(200).json({
      newApartment,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route /api/apartments/:id
 * @method PUT
 * @access PRIVATE
 * @description updates an apartment by its ID
 */
const updateApartment = async (req, res, next) => {
  const { number } = req.params;

  try {
    // check if there is an appartment with the following id
    const apartment = await Apartment.findOneAndUpdate(
      { number },
      {
        $set: {
          number: req.body.number,
          building: req.body.building,
          tenant: req.body.tenant,
          status: req.body.status,
        },
      }
    );

    if (!apartment) {
      throw new Error('No apartment found');
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route /api/apartments/:id
 * @method DELETE
 * @access PRIVATE
 * @description deletes an apartment
 */
const removeApartment = async (req, res, next) => {
  const { number } = req.params;

  try {
    // check if there is an appartment with the following id
    const apartment = await Apartment.findOneAndDelete({ number });

    if (!apartment) {
      throw new Error('No apartment found');
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route /api/apartments/building/:id
 * @method GET
 * @access PRIVATE
 * @description get all the apartments details by building id
 */
const getApartmentsByBuildingId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const apartments = await Apartment.find({ building: id }).populate('building').populate('tenant');

    res.status(200).json({
      success: true,
      apartments,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route /api/apartments/rented
 * @method GET
 * @access PRIVATE
 * @description get all the rented apartments
 */
const getRentedApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find({ status: 'occupied' }).populate('building').populate('tenant');

    res.status(200).json({
      success: true,
      apartments,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = {
  getAllApartments,
  getApartmentByNumber,
  addApartment,
  updateApartment,
  removeApartment,
  getApartmentsByBuildingId,
  getRentedApartments,
};
