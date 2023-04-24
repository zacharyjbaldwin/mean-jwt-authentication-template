const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const { sendVerificationDetails } = require('../helpers/verification.helper');

const JWT_SECRET = process.env.JWT_SECRET || require('../../keys.json').JWT_SECRET;

module.exports.login = (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ message: 'One or more required paramters is missing or malformed.' });
    }

    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) return res.status(401).json({ message: 'Unauthorized.' });

            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) return res.status(401).json({ message: 'Unauthorized.' });

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
            return res.status(500).json({ message: 'Internal server error.' });
        });
};

module.exports.register = (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ message: 'One or more required paramters is missing or malformed.' });
    }

    const { email, firstname, lastname, password } = req.body;

    User.findOne({ email }, '-password')
        .then((user) => {
            if (user) return res.status(409).json({ message: 'EMAIL_ALREADY_IN_USE' });

            bcrypt.hash(password, 10)
                .then((hash) => {
                    const user = new User({
                        email,
                        firstname,
                        lastname,
                        password: hash,
                        role: 'user'
                    });

                    user.save()
                        .then((user) => {
                            sendVerificationDetails(user)
                                .then(() => {
                                    res.status(201).json(user);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch(() => {
                            res.status(500).json({ message: 'Registration failed.' });
                        });
                });
        })
        .catch(() => {
            return res.status(500).json({ message: 'Internal server error.' });
        });
};
