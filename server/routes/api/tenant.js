const router = require('express').Router();
const { addTenant, getTenantDetails, getAllTenants, updateTenant, removeTenant } = require('../../controllers/tenant');

// api/tenants
router.route('/').get(getAllTenants).post(addTenant);

// api/tenants/:id
router.route('/:id').get(getTenantDetails).put(updateTenant).delete(removeTenant);

module.exports = router;
