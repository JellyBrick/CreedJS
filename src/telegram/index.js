/* global minejet */
var User = require('../models/Account');

module.exports = () => {
    minejet.server.getTelegramBot().on('text', msg => {
        minejet.telegramManager.handleTelegramMessages(msg);
    });
};
