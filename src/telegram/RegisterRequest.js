/* global bot */
/* global utils */
var User = require('../models/User');

/**
 * @description
 * 회원가입 명령어를 처리합니다.
 */
//TODO: Registeration 클래스로 기능 분리
module.exports = class {
    constructor(user, id, utils) {
        this.user = user;
        this.id = id;
    }
    
    /**
     * @description
     * 닉네임을 물어봅니다.
     * @param {function} callback
     */
    askNickName(callback) {
        utils.ask(this.id, 'Type MC:PE nickname you want to use : ', msg => {
        callback(msg.text);
        });
    }
    
    /**
     * @description
     * 겹치는 닉네임인지 검사합니다.
     * @param {string} name, {function} callback
     */
    checkOverlappedNickName(name, callback) {
        if(! User.findOne({nickname: name}).exists()) {
            return callback(new Error('Existing nickname'));
        }
        this.user.set('nickname', name);
        callback();
    }
    
    /**
     * @description
     * 비밀번호를 물어봅니다.
     * @param {function} callback
     */
    askPassword(callback) {
        utils.ask(this.id, 'Send password you want to set : ', msg => {
            callback(null, msg.text);
        });
    }
    
    /**
     * @description
     * 이메일을 물어봅니다.
     * @param {function} callback
     */
    askEmailAddress(callback) {
        utils.ask(this.id, 'Send your e-mail address', msg => {
            let email = msg;
            //validate
            this.user.set('email', email);
        });
    }
    
    /**
     * @description
     * 회원가입을 할 지 물어봅니다.
     * @param {function} callback
     */
    askRegisterIntent = callback => {
        utils.ask(this.id, 'Do you want to register with this info? (Y/N)', msg => {
            callback(null, msg.toLowerCase());
        });
    }
    
    /**
     * @description
     * 옳은 선택을 했는지 체크합니다.
     * @param {string} res
     */
    isYes(res) {
        if(res == 'y' || res == 'yes') {
            return true;
        }
    }
    
    /**
     * @description
     * askRegisterIntent의 응답 결과를 처리하니다.
     * @param {Error|null}  err, {string} res
     */
    checkIntent(err, res) {
        if(err) {
            throw err;
        }
        if(this.isYes(res)) {
            //TODO: save user model.
        } else {
            bot.sendMessage(this.id, 'Register failed');
        }
    }
};