const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

module.exports.changePassword = (req, res) => {
    if (req.body.oldPassword == null || req.body.newPassword == null) {
        return res.status(400).json({ error: 'Bad request.' });
    }

    User.findById(req.params.id)
        .then((user) => {
            if (!user) { return res.status(404).json({ error: 'User not found.' }); }

            bcrypt.compare(req.body.oldPassword, user.password)
                .then((isMatch) => {
                    if (!isMatch) return res.status(401).json({ error: 'Unauthorized.' });

                    bcrypt.hash(req.body.newPassword, 10)
                        .then((hash) => {
                            User.findByIdAndUpdate(req.params.id, { password: hash })
                                .then((user) => {
                                    user.password = undefined;
                                    res.status(200).json(true);
                                })
                                .catch(() => {
                                    return res.status(500).json({ error: 'Internal server error.4' });
                                });
                        })
                        .catch(() => {
                            return res.status(500).json({ error: 'Internal server error.3' });
                        });
                })
                .catch(() => {
                    return res.status(500).json({ error: 'Internal server error.2' });
                });
        })
        .catch(() => {
            return res.status(500).json({ error: 'Internal server error.1' });
        });
};