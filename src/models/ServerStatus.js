var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusSchema = new Schema({
  id: Number,
  ip: Number,
  users: Number
});

module.exports = mongoose.model('server-status', statusSchema);
