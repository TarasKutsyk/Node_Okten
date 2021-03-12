const emailActions = require('../constants/emailActions');

module.exports = {
    [emailActions.WELCOME]: {
        subject: 'Welcome, traveller',
        templateName: 'welcome'
    },
    [emailActions.GOODBYE]: {
        subject: 'You have been exiled',
        templateName: 'goodbye'
    },
};
