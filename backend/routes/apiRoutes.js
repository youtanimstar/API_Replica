
const router = require('express').Router();

const {createNewApi } = require('../controllers/apiController');

router.post('/create/api', createNewApi);


module.exports = router;