const VerificationDetail = require('../models/verification-detail.model');
const { sendEmail } = require("./mail.helper");

module.exports.generateVerificationCode = () => {
    return String(Math.floor(Math.random() * 888887 + 111111));
};

module.exports.sendVerificationDetails = async (user) => {
    try {
        await VerificationDetail.deleteMany({ userId: user._id });
    } catch (error) {
        console.log(error);
    }

    const verificationDetails = new VerificationDetail({
        userId: user._id,
        verificationCode: this.generateVerificationCode(),
        expiresOn: new Date(new Date().setDate(new Date().getDate() + 1)),
    });

    verificationDetails.save()
        .then(verificationDetails => {
            sendEmail(user.email, 'Please verify your email address', `<p>Hello ${user.firstname},<br><br>Please verify your email address by clicking this link: <a href="http://localhost:4200/verify-email?userId=${user._id}&verificationCode=${verificationDetails.verificationCode}">http://localhost:4200/verify-email?userId=${user._id}&verificationCode=${verificationDetails.verificationCode}</a></p>`);
        })
        .catch(() => {
            console.log(`Failed to create verification details for user ${user._id}.`);
        });
};