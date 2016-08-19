/* jshint esversion: 6 */
/* global bot */
var Utils = require('./Utils');
var User = require('../models/User');
var Server = require('../models/Server');
var async = require('async');
var utils = new (require('./Utils'))();

module.exports = () => {
    bot.on('text', msg => {
        /* handling text messages */
        if(msg.entities && msg.entities[0].type == 'bot_command') {
            let split = msg.text.toLowerCase().split(' ');
            let command = split[0];
            let id = msg.from.id;
            switch(command) {
                /**
                 * @description
                 * 회원가입 명령어입니다.
                 */
                case '/register':
                    let user = new User();
                    /*
                    async.waterfall([
                        askNickName,
                        checkOverlappedNickName,
                        askPassword,
                        checkPasswordAgain,
                        askEmailAddress,
                        askRegisterIntent
                    ], checkIntent);
                    */
                    break;
                case '/addserver':
                    break;
            }
        }
    });
};