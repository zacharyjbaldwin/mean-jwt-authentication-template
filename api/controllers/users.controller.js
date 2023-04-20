const User = require('../models/user.model');

module.exports.getAllUsers = (req, res) => {
    User.find({}, '-password')
        .then((users) => { res.status(200).json(users); })
        .catch(() => { res.status(500).json({ message: 'Internal server error.' }); });
};

module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        .then((user) => { res.status(200).json(user); })
        .catch(() => { res.status(500).json({ message: 'Internal server error.' }); });
};

module.exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.userId)
        .then(() => { res.status(204).json(); })
        .catch(() => { res.status(500).json({ message: 'Internal server error.' }); });
};