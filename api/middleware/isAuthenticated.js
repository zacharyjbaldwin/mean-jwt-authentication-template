const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET || require('../../keys.json').JWT_SECRET;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = {
            userId: decodedToken.userId,
            email: decodedToken.email,
            firstname: decodedToken.firstname,
            lastname: decodedToken.lastname,
            role: decodedToken.role
        };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized.' });
    }
};