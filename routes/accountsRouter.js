var express = require('express');
var router = express.Router();
const accountsController = require('../controllers/accountsController');

router.route('/').get(accountsController.getAllAccounts);
module.exports = router;