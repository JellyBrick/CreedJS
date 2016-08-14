var utils = require('./src/telegram/utils');
var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot('', {polling: true});

utils.ask(bot, 134431167, ['What\'s your name?', 'How old are you?', 'Are you sleepy?'], result => {
    console.log(result);
});