var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	telegram: {
		userId: Number
		// chatId: Number //userId and chatId is same when chat in private chatting.
	},
	email: String, //Not using this property yet
	password: String,
	registerDate: Date,
	nickname: String
});

module.exports = mongoose.model('User', userSchema);
