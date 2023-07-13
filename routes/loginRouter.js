var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');

router.route('/')
    .post(loginController.authenticate);

module.exports = router;