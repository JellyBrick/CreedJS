const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var account = new Schema({
	telegram: {
		userId: Number
	},
	password: String,
	salt: String,
	registerDate: Date,
	nickname: String,
	isBanned: Boolean
});

account.methods = {
	/**
	 * @description
	 * 비밀번호를 설정합니다.
	 * @param {string} password
	 * @param {function} callback
	 */
	setPassword: function(password, callback) {
		bcrypt.genSalt((err, salt) => {
			if(err) callback(err);
			this.salt = salt;
			bcrypt.hash(password, salt, (err, hash) => {
				if(err) callback(err);
				this.password = hash;
				callback(null);
			});
		});
	},


	/**
	 * @description
	 * 비밀번호가 일치 여부를 전달하는 콜백입니다.
	 * @callback pwdCallback
	 * @param {Error} err
	 * @param {boolean} res
	 */
	/**
	 * @description
	 * 비밀번호 인증 메소드입니다.
	 * @param {string} password
	 * @param {pwdCallback} callback
	 */
	authenticate: function(password, callback) {
		bcrypt.compare(password, this.password, callback);
	}
};

module.exports = mongoose.model('Account', account);
