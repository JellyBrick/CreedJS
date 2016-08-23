var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusSchema = new Schema({
    date: Date,
    ip: String,
    users: Number
});

module.exports = mongoose.model('ServerStatus', statusSchema);
