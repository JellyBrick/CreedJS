var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.experts = {
	user: new Schema({
		email: String,
		password: String,
		registerDate: Date,
		isCertified: Boolean,
		servers: [{id: Number, firstJoin: Date, lastJoin: Date}],
		nickname: String
	});,
	server: new Schema({
		admin: String, //email
		firstOpen: Strimg,
		lastOpen: String,
		type: String, // Nukkit, Vanilla, MineJS etc..
		visitors: Number,
		domain: String
	});
}