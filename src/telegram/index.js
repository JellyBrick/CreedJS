var User = require('../models/Account');
var async = require('async');
var RegisterRequest = require('./requests/RegisterRequest');

module.exports = server => {
    server.getTelegramBot().on('text', msg => {

    });
};
