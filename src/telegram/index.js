/* global minejet */
var User = require('../models/Account');
var RegisterRequest = require('./requests/RegisterRequest');

module.exports = () => {
    server.getTelegramBot().on('text', msg => {
        minejet.telegramManager.handleTelegramMessages(msg);
    });
};
