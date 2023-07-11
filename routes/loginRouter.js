var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');
const axios = require('axios');

    //   await Promise.all([
    //     axios.get('http://localhost:3000/items').then((res) => allItemList = res.data.data),
    //     axios.get('http://localhost:3000/items/filters/active').then((res) => activeItemList = res.data.data),
    //     axios.get('http://localhost:3000/items/filters/inactive').then((res) => inactiveItemList = res.data.data),
    //     axios.get('http://localhost:3000/items/filters/' + status + '/?name=' + searchValue).then((res) => currentList = res.data.data)
    //   ]);


router.route('/')
    .post(loginController.authenticate);

module.exports = router;