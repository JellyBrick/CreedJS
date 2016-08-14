/* jshint esversion: 6 */
var bot = new (require('node-telegram-bot-api'))(global.config.botToken, {polling: true});
var Utils = require('./Utils');
var User = require('../models/User');
var Server = require('../models/Server');

module.exports = () => {
    bot.on('text', msg => {
        /* handling text messages */
        if(msg.entities && msg.entities[0].type == 'bot_command') {
            var split = msg.text.toLowerCase().split(' ');
            var command = split[0];
            switch(command) {
                case '/register':
                    Utils.ask(bot, msg.from.id, ['Your mc:pe nickname :', 'Your password : ', 'Retype your password : ', 'Are you sure? (Y/N)'], result => {
                        if(result[1] != result[2]) {
                            bot.sendMessage(msg.from.id, 'Your password is not match with retyped password');
                            return;
                        }
                        
                        if(result[3] != 'Y' || result[3] != 'y' || result[3] != 'yes') {
                            bot.sendMessage(msg.from.id, 'You stopped registering. Try again');
                            return;
                        }
                        
                        //TODO: 텔레그램 유저 id 중복 체크
                        //TODO: 닉네임/패스워드 정규식으로 검사
                    });
                    break;
                case '/addserver':
                    Utils.ask(bot, msg.from.id, ['Name of server : '], result => {
                        
                    });
                    break;
            }
        }
    });
};
