var express = require('express');
var router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const verifyAuthToken = require('../middlewares/verifyAuthToken');

router.route('/')
    .get(dashboardController.entry)
    .post(dashboardController.loadDashboardPage);


module.exports = router;