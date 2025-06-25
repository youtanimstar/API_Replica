
const router = require('express').Router();

const {createNewApi, createNewEndpoint } = require('../controllers/apiController');

router.post('/create/api', createNewApi);

router.post('/create/endpoint', createNewEndpoint);


module.exports = router;