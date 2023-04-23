const mongoose = require('mongoose');

const verificationDetailSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    verificationCode: { type: Number, required: true },
    expiresOn: { type: Date, required: true }
});

module.exports = mongoose.model('VerificationDetail', verificationDetailSchema);