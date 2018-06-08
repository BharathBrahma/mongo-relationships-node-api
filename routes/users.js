const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();
const users_controller = require('../controllers/users');

router.get('/', users_controller.index_async);
router.post('/', users_controller.create_user_async);

router.route('/:userId')
    .get( users_controller.getUser)
    .put(users_controller.replaceUser)
    .patch(users_controller.updateUser);

module.exports = router;