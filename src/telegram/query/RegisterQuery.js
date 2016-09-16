/* global minejet */

var Account = require('../../models/Account');
var error = require('../error');
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
         * @property {string} email
         */
        this.user = {};
        console.log('RegisterQuery constructor called');
        console.log('this.id = ' + this.id);
    }

    /**
     * @description
     * 닉네임을 물어봅니다.
     * @param {function} callback
     */
    askNickName(callback) {
        console.log('' + typeof(this));
        console.log('askNickName called');
        console.log('this.id = ' + this.id);
        let id = this.id;
        Account.where({
            telegram: {userId: this.id}
        }).findOne((err, doc) => {
            console.log('?');
            if (err) {
                console.error(err);
                return callback(err);
            }
            if (doc) {
                console.log('failed');
                return callback(new Error(error.ALREADY_REGISTERED));
            }
            super.ask(this.id, 'Type MC:PE nickname you want to use : ', msg => {
                callback(null, msg.text);
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
            callback(null, msg.text);
        });
    }

    /**
     * @description
     * 이메일을 물어봅니다.
     * @param {function} callback
     */
    askEmailAddress(callback) {
        super.ask(this.id, 'Send your e-mail address', msg => {
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
        if (!Account.where({
                nickname: name
            }).exists()) {
            return callback(new Error(error.EXISTING_NICKNAME));
        }
        this.user['nickname'] = name;
        callback();
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
        if (!this.isYes(res)) {
            bot.sendMessage(this.id, 'Register failed');
            return null;
        }
        let account = new Account({
            telegram: {
                userId: this.id
            },
            nickname: this.user['nickname'],
            email: this.user['email'],
            isBanned: false,
            registerDate: new Date()
        });
        account.setPassword(this.user['password']);

        account.save((err, collection) => {
            if (err) {
                return console.error(err);
            }
            console.log('save account succesful');
            console.log('collection ' + collection);
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
