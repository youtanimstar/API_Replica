
const router = require('express').Router();

const {createNewApi, createNewEndpoint, addDataToEndpoint, updateNewApi, deleteNewApi, updateNewEndpoint, deleteNewEndpoint, getAllApis,getAllEndpoints } = require('../controllers/apiController');

router.post('/get/all/apis/user',getAllApis);

router.post('/create/api', createNewApi);
// router.update('/update/api',updateNewApi);
// router.delete('/delete/api/:id', deleteNewApi);

router.post('/get/all/endpoints',getAllEndpoints);
router.post('/create/endpoint', createNewEndpoint);
// router.put('/update/endpoint', updateNewEndpoint);
// router.delete('/delete/endpoint/:id', deleteNewEndpoint);

router.put('/add/data', addDataToEndpoint);


module.exports = router;