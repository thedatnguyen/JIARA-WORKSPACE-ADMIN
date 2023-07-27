var express = require('express');
var router = express.Router();

const messagesController = require('../controllers/messagesController');

router.route('/')
    .get(messagesController.getAllConversations);

//router.route('/:messageId').get(messagesController.getInbox);

module.exports = router;