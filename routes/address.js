const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const AddressController = require('../controllers/addresses');


router.route('/')
    .get(AddressController.index)
    .post(AddressController.addAddress);

module.exports = router;