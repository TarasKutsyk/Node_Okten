const EmailTemplates = require('email-templates');
const nodeMailer = require('nodemailer');
const path = require('path');

const ErrorHandler = require('../auxiliary/errorHandler');
const errorMessages = require('../constants/errors/errorMessages');
const templatesCollection = require('../email-templates');

const { ROOT_EMAIL, ROOT_EMAIL_PASSWORD} = require('../config');

const templatesParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const mailTransporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesCollection[action];

        if (!templateInfo) {
            throw new ErrorHandler(errorMessages.BAD_EMAIL);
        }

        const parsedTemplate = await templatesParser.render(templateInfo.templateName, context);

        return mailTransporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject: templateInfo.subject,
            html: parsedTemplate
        });
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = {
    sendMail
};
