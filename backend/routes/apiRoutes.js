
const router = require('express').Router();

const {createNewApi, createNewEndpoint, addDataToEndpoint } = require('../controllers/apiController');

router.post('/create/api', createNewApi);

router.post('/create/endpoint', createNewEndpoint);

router.post('/add/data', addDataToEndpoint);


module.exports = router;