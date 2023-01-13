const router = require('express').Router();
const {
  getAllApartments,
  addApartment,
  updateApartment,
  removeApartment,
  getApartmentsByBuildingId,
} = require('../../controllers/apartments');

router.route('/').get(getAllApartments).post(addApartment);
router.route('/:number').put(updateApartment).delete(removeApartment);
router.get('/building/:id', getApartmentsByBuildingId);

module.exports = router;
