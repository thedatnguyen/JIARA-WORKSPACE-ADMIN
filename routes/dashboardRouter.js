var express = require('express');
var router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.route('/')
    .get(dashboardController.entry)
    .post(dashboardController.loadDashboardPage);

router.route('/approve').get(dashboardController.approvePending);

router.route('/reject').get(dashboardController.rejectPending);


module.exports = router;