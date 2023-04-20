const router = require('express').Router();
const controller = require('../controllers/authentication.controller');
const { check } = require('express-validator');

router.post('/login',
    check('email').normalizeEmail().notEmpty(),
    check('password').notEmpty(),
    controller.login);

router.post('/register',
    check('email').normalizeEmail().notEmpty(),
    check('firstname').notEmpty(),
    check('lastname').notEmpty(),
    check('password').notEmpty(),
    controller.register);

module.exports = router;