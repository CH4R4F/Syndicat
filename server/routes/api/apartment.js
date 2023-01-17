const router = require('express').Router();
const {
  getAllApartments,
  addApartment,
  updateApartment,
  removeApartment,
  getApartmentsByBuildingId,
  getApartmentByNumber,
  getRentedApartments,
} = require('../../controllers/apartments');

router.route('/').get(getAllApartments).post(addApartment);
router.get('/rented', getRentedApartments);
router.route('/:number').get(getApartmentByNumber).put(updateApartment).delete(removeApartment);
router.get('/building/:id', getApartmentsByBuildingId);

module.exports = router;
