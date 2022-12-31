const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || require('../keys.json').JWT_SECRET;

module.exports.login = (req, res) => {
    if (req.body.email == null || req.body.password == null) {
        return res.status(400).json({ error: 'Bad request.' });
    }

    User.findOne({ email: req.body.email.trim().toLowerCase() })
        .then((user) => {
            if (!user) return res.status(401).json({ error: 'Unauthorized.' });

            bcrypt.compare(req.body.password, user.password)
                .then((isMatch) => {
                    if (!isMatch) return res.status(401).json({ error: 'Unauthorized.' });

                    const token = jwt.sign(
                        { userId: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, role: user.role },
                        JWT_SECRET,
                        { expiresIn: '1h' }
                    );

                    res.status(200).json({
                        token: token,
                        expiresIn: 3600,
                        userId: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        role: user.role.trim().toLowerCase()
                    });
                });
        })
        .catch(() => {
            return res.status(500).json({ error: 'Internal server error.' });
        });
};

module.exports.register = (req, res) => {
    if (req.body.email == null || req.body.firstname == null || req.body.lastname == null || req.body.password == null) {
        return res.status(400).json({ error: 'Bad request.' });
    }

    User.findOne({ email: req.body.email.trim().toLowerCase() })
        .then((user) => {
            if (user) return res.status(409).json({ error: 'EMAIL_IN_USE' });

            bcrypt.hash(req.body.password, 10)
                .then((hash) => {
                    const user = new User({
                        email: req.body.email.trim().toLowerCase(),
                        firstname: req.body.firstname.trim(),
                        lastname: req.body.lastname.trim(),
                        password: hash,
                        role: 'user'
                    });

                    user.save()
                        .then((user) => {
                            user.password = undefined;
                            res.status(201).json(user);
                        })
                        .catch(() => {
                            res.status(500).json({ message: 'Registration failed.' });
                        });
                });
        })
        .catch(() => {
            return res.status(500).json({ error: 'Internal server error.' });
        });
};

module.exports.changePassword = (req, res) => {

};