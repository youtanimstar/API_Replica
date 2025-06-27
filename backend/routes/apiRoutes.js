
const router = require('express').Router();

const {createNewApi, createNewEndpoint, addDataToEndpoint, updateNewApi, deleteNewApi, updateNewEndpoint, deleteNewEndpoint } = require('../controllers/apiController');

router.post('/create/api', createNewApi);
// router.update('/update/api',updateNewApi);
// router.delete('/delete/api/:id', deleteNewApi);


router.post('/create/endpoint', createNewEndpoint);
// router.put('/update/endpoint', updateNewEndpoint);
// router.delete('/delete/endpoint/:id', deleteNewEndpoint);

router.post('/add/data', addDataToEndpoint);


module.exports = router;