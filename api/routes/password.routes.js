const router = require('express').Router();
const controller = require('../controllers/password.controller');
const isAuthenticated = require('../middleware/isAuthenticated');
const { check } = require('express-validator');

router.put('/:userId',
    isAuthenticated, 
    check('oldPassword').notEmpty(),
    check('newPassword').notEmpty(),
    controller.changePassword);

module.exports = router;