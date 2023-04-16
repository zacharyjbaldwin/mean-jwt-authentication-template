const sgMail = require('@sendgrid/mail')
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || require('../../keys.json').SENDGRID_API_KEY;
const { from } = require('../../config.json').sendgrid;
const { doGeneralEmailNotitications } = require('../../config.json');

module.exports.sendEmail = async (to, subject, html) => {
    if (doGeneralEmailNotitications) {
        sgMail.setApiKey(SENDGRID_API_KEY);
        try {
            await sgMail.send({
                to,
                subject,
                from,
                html,
                text: html
            });
        } catch (error) {
            console.log(error);
        }
    }
};