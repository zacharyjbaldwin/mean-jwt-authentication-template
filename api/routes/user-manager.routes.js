const router = require('express').Router();
const controller = require('../controllers/user-manager.controller');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');

router.get('/', isAuthenticated, isAdmin, controller.getAllUsers);

router.put('/:id', isAuthenticated, isAdmin, controller.updateUser);

router.delete('/:id', isAuthenticated, isAdmin, controller.deleteUser);

module.exports = router;