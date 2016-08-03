var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
		email: String,
		password: String,
		registerDate: Date,
		isCertified: Boolean,
		servers: [{
			id: Number,
			firstJoin: Date,
			lastJoin: Date,
			password: String
			}],
		nickname: String
	});

module.exports = mongoose.model('user', userSchema);