var express = require('express');
var router = express.Router();
const accountsController = require('../controllers/accountsController');
const errorHandler = require('../middlewares/errorHandler');

router.route('/')
    .get(accountsController.getAllAccounts, errorHandler)
    
module.exports = router;