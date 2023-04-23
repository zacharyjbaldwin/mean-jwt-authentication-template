const router = require('express').Router();
const controller = require('../controllers/verification.controller');
const { check } = require('express-validator');

router.post('/:userId',
    check('verificationCode').notEmpty(),
    controller.verifyUser);

module.exports = router;