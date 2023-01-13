const router = require('express').Router();
const {
  getAllbuildings,
  addBuilding,
  updateBuilding,
  removeBuilding,
  getBuildingById,
} = require('../../controllers/building');

router.route('/').get(getAllbuildings).post(addBuilding);
router.route('/:id').get(getBuildingById).put(updateBuilding).delete(removeBuilding);

module.exports = router;
