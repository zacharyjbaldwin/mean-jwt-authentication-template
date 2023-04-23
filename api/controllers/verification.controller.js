const User = require('../models/user.model');
const VerificationDetail = require('../models/verification-detail.model');
const { validationResult } = require("express-validator");

module.exports.verifyUser = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ message: 'One or more required parameters is mising or malformed.' });
    }

    const { userId } = req.params;
    const { verificationCode } = req.query;

    let user;
    let verificationDetails;
    try {
        user = await User.findById(userId, '-password');
        verificationDetails = await VerificationDetail.findOne({ userId });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal error.' });
    }

    if (!user || !verificationDetails) {
        return res.status(400).json({ message: 'VERIFICATION_CODE_INVALID', isVerified: false });
    }

    if (user.isVerified) {
        return res.status(400).json({ message: 'EMAIL_ALREADY_VERIFIED', isVerified: user.isVerified });
    }

    if (new Date() > new Date(verificationDetails.expiresOn)) {
        return res.status(400).json({ message: 'VERIFICATION_CODE_EXPIRED', isVerified: user.isVerified });
    }

    if (+verificationCode === verificationDetails.verificationCode) {
        user.isVerified = true;
    } else {
        return res.status(400).json({ message: 'VERIFICATION_CODE_INVALID', isVerified: user.isVerified });
    }

    try {
        await user.save();
        await verificationDetails.delete();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal error.' });
    }

    res.status(200).json({ message: 'VERIFICATION_SUCCESS', isVerified: user.isVerified });
};