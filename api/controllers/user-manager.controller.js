const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
    User.find({})
        .then((users) => {
            for (let user of users) {
                user.password = undefined;
            }
            res.status(200).json(users); 
        })
        .catch(() => { res.status(500).json({ error: 'Internal server error.' }); });
};

module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => { res.status(200).json(user); })
        .catch(() => { res.status(500).json({ error: 'Internal server error.' }); });
};

module.exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => { res.status(204).json(); })
        .catch(() => { res.status(500).json({ error: 'Internal server error.' }); });
};