const router = require('express').Router();
const { getAllApartments, addApartment, updateApartment, removeApartment } = require('../../controllers/apartments');

router.route('/').get(getAllApartments).post(addApartment);
router.route('/:number').put(updateApartment).delete(removeApartment);

module.exports = router;
