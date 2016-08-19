/* jshint esversion: 6 */
/* global bot */
/* global utils */
var Utils = require('./Utils');
var User = require('../models/User');
var Server = require('../models/Server');
var async = require('async');
var RegisterRequest = require('./RegisterRequest');

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
                    let req = new RegisterRequest(user, id);
                    
                    async.waterfall([
                        req.askNickName,
                        req.checkOverlappedNickName,
                        req.askPassword,
                        req.askEmailAddress,
                        req.askRegisterIntent
                    ], req.checkIntent);
                    
                    break;
                case '/addserver':
                    break;
            }
        }
    });
};