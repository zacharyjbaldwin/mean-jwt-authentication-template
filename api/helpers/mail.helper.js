const sgMail = require('@sendgrid/mail');

const EMAIL_FROM = process.env.EMAIL_FROM || require('../../keys.json').EMAIL_FROM;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || require('../../keys.json').SENDGRID_API_KEY;

module.exports.sendEmail = (to, subject, html) => {
    if (SENDGRID_API_KEY) {
        sgMail.setApiKey(SENDGRID_API_KEY);
        sgMail.send({
            to,
            from: EMAIL_FROM,
            subject,
            html
        })
            .then(() => {
                console.log(`Sent email to ${to}.`);
            })
            .catch((error) => {
                console.log(`Failed to send email to ${to}.`);
                console.log(error);
            })
    }
};