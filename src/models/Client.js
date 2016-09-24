var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var clientSchema = new Schema({
    admin: ObjectId,
    name: String,
    domain: String,
    visitors: Number
});

module.exports = mongoose.model('Client', serverSchema);
