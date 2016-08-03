var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serverSchema = new Schema({
		admin: String, //email
		firstOpen: Strimg,
		lastOpen: String,
		type: String, // Nukkit, Vanilla, MineJS etc..
		visitors: Number,
		domain: String
	});

module.exports = mongoose.model('server', serverSchema);