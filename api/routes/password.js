const router = require('express').Router();
const controller = require('../controllers/password');
const isAuthenticated = require('../middleware/isAuthenticated');

router.put('/:id', isAuthenticated, controller.changePassword);

module.exports = router;