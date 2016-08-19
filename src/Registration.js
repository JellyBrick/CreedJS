var UserModel = require('./models/User');
var bcrypt = require('bcryptjs');
var Model = require('mogoose').model();

module.exports = class extends Model{
  constructor(user) {
    user.password = bcrypt.hash(user.password, 8);
    this.user = new UserModel(user);
  }

  save() {
    this.user.save();
  }
};