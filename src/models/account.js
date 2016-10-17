/*global creedjs */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

let account = new Schema({
    telegramId: Number,
    password: String,
    salt: String,
    registerDate: Date,
    nickname: {
        type: String,
        lowercase: true,
        maxlength: 12,
        minlength: 4
    },
    isBanned: Boolean
});

account.methods = {
    /**
     * @description
     * This method sets password.
     * 이 메소드는 비밀번호를 설정합니다.
     * @param {string} password
     * @param {function} callback
     */
    setPassword: function(password, callback) {
        bcrypt.genSalt((err, salt) => {
            if (err) return callback(err);
            this.salt = salt;
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return callback(err);
                this.password = hash;
                callback();
            });
        });
    },

    /**
     * @description
     * Passing if password is right.
     * 비밀번호가 일치 여부를 전달하는 콜백입니다.
     * @callback pwdCallback
     * @param {Error} err
     * @param {boolean} res
     */
    /**
     * @description
	 * This method authenticate his password.
	 * 비밀번호 인증 메소드입니다.
	 * @param {string} password
	 * @param {?pwdCallback} callback
	 */
    authenticate: function(password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, this.password, (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    },
};
var AccountModel = mongoose.model('Account', account);

class Account extends AccountModel {
    static findByNickName(nickname) {
        return new Promise((resolve, reject) => {
            this.findOne({nickname}).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    }
    static findByTelegramId(telegramId) {
        return new Promise((resolve, reject) => {
            this.findOne({telegramId}).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = Account;
