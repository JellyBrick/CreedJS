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
                //TODO: 커맨드 중첩 문제 해결
                case '/register':
                    Utils.ask(bot, msg.from.id, ['Your mc:pe nickname :', 'Your password : ', 'Retype your password : ', 'Are you sure? (Y/N)'], result => {
                        switch(result.length) {
                            case 1:
                                break;
                            case 2:
                                break;
                            case 3:
                                if(result[1].text != result[2].text) {
                                    console.log(result[1]);
                                    console.log(result[2]);
                                    bot.sendMessage(msg.from.id, 'Your password is not match with retyped password');
                                    return;
                                }
                                break;
                            case 4:
                                if(result[3].text != 'Y' && result[3].text != 'y' && result[3].text != 'yes') {
                                    bot.sendMessage(msg.from.id, 'You stopped registering. Try again');
                                    return;
                                } else {
                                    bot.sendMessage(msg.from.id, 'Authorized successfully');
                                    bot.sendMessage(msg.from.id, 'Welcome, ' + result[0].text);
                                }
                                break;
                            //TODO: 텔레그램 유저 id 중복 체크
                            //TODO: 닉네임/패스워드 regex로 검사
                        }
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
