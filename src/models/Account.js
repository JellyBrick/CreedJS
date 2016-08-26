var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var account = new Schema({
	telegram: {
		userId: Number
	},
	password: String,
	registerDate: Date,
	nickname: String,
	isBanned: Boolean
});

account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', account);
