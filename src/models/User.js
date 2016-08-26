var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	telegram: {
		userId: Number
	},
	password: String,
	registerDate: Date,
	nickname: String,
	isBanned: Boolean
});

module.exports = mongoose.model('User', userSchema);
