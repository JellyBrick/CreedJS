var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	telegram: {
		userId: Number,
		chatId: Number
	},
	password: String,
	registerDate: Date,
	isAuthenticated: Boolean,
	nickname: String
});

module.exports = mongoose.model('user', userSchema);
