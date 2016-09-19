/* global minejet */

var Account = require('../../models/Account');
var ErrorMessage = require('../ErrorMessage');
var Query = require('./Query');

/**
 * @description
 * 회원가입 명령어를 처리합니다.
 */

module.exports = class RegisterQuery extends Query {
    /**
     * @param {Model} user
     * @param {number} id
     */
    constructor(bot,id) {
        super(bot, id);
        /**
         * @description
         * 유저 정보를 임시로 저장합니다
         * @property {string} nickname
         * @property {string} password
         */
        this.user = {};
    }

    /**
     * @description
     * 닉네임을 물어봅니다.
     * @param {function} callback
     */
    askNickName(callback) {
        Account.findOne({
            telegram: {userId: this.id}
        }, (err, doc) => {
            if (err) {
                return callback(err);
            }
            if (doc) {
                return callback(new Error(ErrorMessage.ALREADY_REGISTERED));
            }
            super.ask(this.id, 'Type MC:PE nickname you want to use : ', msg => {
                this.checkDuplicatedNickName(msg, callback);
            });
        });
    }

    /**
     * @description
     * 비밀번호를 물어봅니다.
     * @param {function} callback
     */
    askPassword(callback) {
        super.ask(this.id, 'Send password you want to set : ', msg => {
            this.user['password'] = msg;
            callback(null);
        });
    }

    /**
     * @description
     * 이메일을 물어봅니다.
     * @param {function} callback
     */
    askEmailAddress(p, callback) {
        super.ask(this.id, 'Send your e-mail address', msg => {
            let email = msg;
            //validate
            this.user['email'] = email;
            callback(null);
        });
    }

    /**
     * @description
     * 회원가입을 할 지 물어봅니다.
     * @param {function} callback
     */
    askRegisterIntention(callback) {
        super.ask(this.id, 'Do you want to register with this info? (Y/N)', msg => {
            callback(null, msg.toLowerCase());
        });
    }

    /**
     * @description
     * 겹치는 닉네임인지 검사합니다.
     * @param {string} name
     * @param {function} callback
     */
    checkDuplicatedNickName(name, callback) {
        console.log(typeof(name));
        Account.findOne({
            nickname: name
        }, (err, doc) => {
            if(err) return callback(err);
            if(doc) return callback(new Error(ErrorMessage.EXISTING_NICKNAME));
            this.user['nickname'] = name;
            callback(null);
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
            this.bot.sendMessage(this.id, err.message);
        }
        if (!super.isAcceptance(res)) { // 에러나면 이 부분도 실행된다.
            this.bot.sendMessage(this.id, 'Register failed');
            return;
        }
        let account = new Account({
            telegram: {
                userId: this.id
            },
            nickname: this.user['nickname'],
            isBanned: false,
            registerDate: new Date()
        });
        account.setPassword(this.user['password'], (err) => {
            if(err) return console.error(err);
            account.save((err, collection) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.bot.sendMessage(this.id, 'Register success');
            });
        });
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
