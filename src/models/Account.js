const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var account = new Schema({
	telegram: {
		userId: Number
	},
	password: String,
	registerDate: Date,
	nickname: String,
	isBanned: Boolean
});

account.methods = {
	setPassword: (password, callback) => {
		bcrypt.genSalt((err, salt) => {
			if(err) callback(err);
			//this.salt = salt;
			bcrypt.hash(password, salt, (err, hash) => {
				if(err) callback(err);
				//this.password = hash;
				callback(null);
			});
		});
	},

};


module.exports = mongoose.model('Account', account);
