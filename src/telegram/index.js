/* jshint esversion: 6 */
/* global bot */
/* global utils */
var User = require('../models/User');
var async = require('async');
var RegisterRequest = require('./RegisterRequest');

module.exports = () => {
    bot.on('text', msg => {
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
                        req.askRegisterIntention
                    ], req.checkFinalIntention);
                    
                    break;
                /**
                 * @description
                 * 비밀번호를 변경합니다
                 */
                case '/changepassword':
                    break;
                /**
                 * @description
                 * 새 서버를 등록합니다.
                 */
                case '/newserver':
                    break;
            }
        }
    });
};