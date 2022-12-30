module.exports = (req, res, next) => {
    if (req.user == null || req.user.role !== "admin") {
        res.status(401).json({ error: 'Unauthorized.' });
    } else if (req.user.role === "admin") {
        next();
    }
};