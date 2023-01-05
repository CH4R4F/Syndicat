const router = require('express').Router();
const { getAllbuildings, addBuilding, updateBuilding, removeBuilding } = require('../../controllers/building');

router.route('/').get(getAllbuildings).post(addBuilding);
router.route('/:id').put(updateBuilding).delete(removeBuilding);

module.exports = router;
