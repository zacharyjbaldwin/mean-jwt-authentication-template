const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { validationResult } = require('express-validator');

module.exports.changePassword = (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ message: 'One or more required paramters is missing or malformed.' });
    }

    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    User.findById(userId)
        .then((user) => {
            if (!user) { return res.status(404).json({ message: 'User not found.' }); }

            bcrypt.compare(oldPassword, user.password)
                .then((isMatch) => {
                    if (!isMatch) return res.status(401).json({ message: 'Unauthorized.' });

                    bcrypt.hash(newPassword, 10)
                        .then((hash) => {
                            User.findByIdAndUpdate(userId, { password: hash })
                                .then((user) => {
                                    user.password = undefined;
                                    res.status(200).json(true);
                                })
                                .catch(() => {
                                    return res.status(500).json({ message: 'Internal server error.4' });
                                });
                        })
                        .catch(() => {
                            return res.status(500).json({ message: 'Internal server error.3' });
                        });
                })
                .catch(() => {
                    return res.status(500).json({ message: 'Internal server error.2' });
                });
        })
        .catch(() => {
            return res.status(500).json({ message: 'Internal server error.1' });
        });
};