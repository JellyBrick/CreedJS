var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var serverSchema = new Schema({
    admin: ObjectId,
    name: String,
    ip: String,
    visitors: Number
});

module.exports = mongoose.model('Server', serverSchema);