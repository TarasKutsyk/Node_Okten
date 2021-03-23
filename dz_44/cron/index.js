const cron = require('node-cron');
const cronTabs = require('../constants/cronTables');
const deleteOldTokens = require('./jobs/deleteOldTokens');

module.exports = () => {
    cron.schedule(cronTabs.DELETE_OLD_TOKENS, deleteOldTokens);
};
