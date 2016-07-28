var schema = require('./schema');
var mongoose = require('mongoose');

module.experts = {
	User: mongoose.model('User', schema.user);
	Server: mongoose.model('Server', schema.server);
}