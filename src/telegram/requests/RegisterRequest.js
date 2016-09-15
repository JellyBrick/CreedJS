/* global minejet */

var User = require('../../models/Account');
var error = require('../error');

/**
 * @description
 * 회원가입 명령어를 처리합니다.
 */

module.exports = class RegisterRequest {
    /**
     * @param {Model} user
     * @param {number} id
     */
    constructor(bot, id) {
        /**
         * @description
         * 유저 정보를 임시로 저장합니다
         * @property {}
         *
         */
        this.user = {};
        user.id = id;
        this.bot = bot;
    }

    /**
     * @description
     * 닉네임을 물어봅니다.
     * @param {function} callback
     */
    askNickName(callback) {
        if (User.findOne({
                id: this.user.id
            }).exists()) {
            callback(new Error(error.ALREADY_REGISTERED));
        }
        minejet.telegramManager.ask(this.id, 'Type MC:PE nickname you want to use : ', msg => {
            callback(null, msg.text);
        });
    }

    /**
     * @description
     * 겹치는 닉네임인지 검사합니다.
     * @param {string} name
     * @param {function} callback
     */
    checkOverlappedNickName(name, callback) {
        if (!User.findOne({
                nickname: name
            }).exists()) {
            return callback(new Error(error.EXISTING_NICKNAME));
        }
        this.user['nickname'] = name;
        callback();
    }

    /**
     * @description
     * 비밀번호를 물어봅니다.
     * @param {function} callback
     */
    askPassword(callback) {
        minejet.telegramManager.ask(this.id, 'Send password you want to set : ', msg => {
            callback(null, msg.text);
        });
    }

    /**
     * @description
     * 이메일을 물어봅니다.
     * @param {function} callback
     */
    askEmailAddress(callback) {
        minejet.telegramManager.ask(this.id, 'Send your e-mail address', msg => {
            let email = msg;
            //validate
            this.user['email'] = email;
        });
    }

    /**
     * @description
     * 회원가입을 할 지 물어봅니다.
     * @param {function} callback
     */
    askRegisterIntention(callback) {
        minejet.telegramManagerManager.ask(this.id, 'Do you want to register with this info? (Y/N)', msg => {
            callback(null, msg.toLowerCase());
        });
    }

    /**
     * @description
     * askRegisterIntention의 응답 결과를 처리하니다.
     * @param {?Error}  err
     * @param {string} res
     */
    checkFinalIntention(err, res) {
        if (err) {
            throw err;
        }
        if (this.isYes(res)) {
            return null;
        } else {
            bot.sendMessage(this.id, 'Register failed');
        }
    }

    /**
     * @description
     * 유저 데이터를 반환합니다.
     * @return {object}
     */
    getData() {
        return this.user;
    }
};
