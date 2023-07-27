var express = require('express');
var router = express.Router();

const groupsController = require('../controllers/groupsController');

router.route('/')
    .get(groupsController.getAllGroups)
    .post(groupsController.createNewGroup)

router.route('/:groupId')
    .get(groupsController.getGroupDetails)

router.route('/:groupId/delete')
    .get(groupsController.deleteGroup)

router.route('/:groupId/managers')
    .get(groupsController.removeManager)
    .post(groupsController.addManagers)

module.exports = router;