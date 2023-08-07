var express = require('express');
var router = express.Router();
const personalController = require('../controllers/personalController');

router.route('/')
    .get(personalController.loadPersonalDetail)
    .post(personalController.updatePersonalDetail);

router.route('/resetPassword')
    .post(personalController.changePassword)

router.route('/forgetPassword')
    .post(personalController.forgetPassword)


module.exports = router;