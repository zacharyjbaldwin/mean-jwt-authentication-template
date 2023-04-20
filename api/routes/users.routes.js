const router = require('express').Router();
const controller = require('../controllers/users.controller');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');

router.get('/', isAuthenticated, isAdmin, controller.getAllUsers);

router.patch('/:userId', isAuthenticated, isAdmin, controller.updateUser);

router.delete('/:userId', isAuthenticated, isAdmin, controller.deleteUser);

module.exports = router;