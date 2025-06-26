const { customApiControllerGET } = require('../controllers/customApiController');

const router = require('express').Router();

// Fixed route - using wildcard to capture the entire path after /api/
router.get('/*splat', customApiControllerGET);

module.exports = router;