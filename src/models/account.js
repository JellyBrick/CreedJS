const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var account = new Schema({
    telegramId: Number,
    password: String,
    salt: String,
    registerDate: Date,
    nickname: String,
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
            if (err) callback(err);
            this.salt = salt;
            console.log(typeof (password));
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) callback(err);
                this.password = hash;
                callback(null);
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
	 * @param {pwdCallback} callback
	 */
    authenticate: function(password, callback) {
        bcrypt.compare(password, this.password, callback);
    },

	/**
	 * @description
	 * It bans user.
	 * 유저를 밴 시킵니다.
	 */
    setBanned: function() {
        this.isBanned = true;
    }
};
var AccountModel = mongoose.model('Account', account);

class Account extends AccountModel {
    static findByNickName(name) {
        return this.findOne({nickname: name});
    }
    static findByTelegramId(id) {
        return this.findOne({telegramId: id});
    }
}

module.exports = Account;
