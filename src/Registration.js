var UserModel = require('./models/User');
var bcrypt = require('bcryptjs');

module.exports = class {
  constructor(user) {
    user.password = bcrypt.hash(user.password, 8);
    this.user = new UserModel(user);
  }

  save() {
    this.user.save();
  }
};