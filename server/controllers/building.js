const Building = require('../models/building');

/**
 * @route /api/buildings
 * @method GET
 * @access PRIVATE
 * @description get all the buildings
 */
const getAllbuildings = async (req, res, next) => {
  try {
    const buildings = await Building.find();

    if (!buildings) {
      throw new Error('No buildings found');
    }

    res.status(200).json({
      success: true,
      buildings,
    });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

/**
 * @route /api/buildings
 * @method POST
 * @access PRIVATE
 * @description adds a new building
 */
const addBuilding = async (req, res, next) => {
  const { name, address, city, numberOfFloors, numberOfApartments } = req.body;

  try {
    // check if a building with that name is already exist
    const building = await Building.findOne({ name });

    // validate input
    if (!name || !address || !city) {
      throw new Error('please add all required fields');
    }

    if (building) {
      throw new Error(`Apartment with the name ${name} is already exist`);
    }

    // create the building
    const newBuilding = await Building.create({
      name,
      address,
      city,
      numberOfFloors,
      numberOfApartments,
    });

    res.status(200).json({
      success: true,
      newBuilding,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

/**
 * @route /api/buildings/:id
 * @method PUT
 * @access PRIVATE
 * @description updates a building by its id
 */
const updateBuilding = async (req, res, next) => {
  const { id } = req.params;
  const { name, address, city, numberOfFloors, numberOfApartments } = req.body;

  try {
    // validate input
    if (!name || !address || !city) {
      throw new Error('please add all required fields');
    }

    const building = await Building.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          address: address,
          city: city,
          numberOfFloors: numberOfFloors,
          numberOfApartments: numberOfApartments,
        },
      }
    );

    if (!building) {
      throw new Error('No building is found');
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
 * @route /api/buildings/:id
 * @method DELETE
 * @access PRIVATE
 * @description deletes a building
 */
const removeBuilding = async (req, res, next) => {
  const { id } = req.params;

  try {
    // check if there is a building with the following id
    const building = await Building.findOneAndDelete({ _id: id });

    if (!building) {
      throw new Error('No building is found');
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
  getAllbuildings,
  addBuilding,
  updateBuilding,
  removeBuilding,
};
