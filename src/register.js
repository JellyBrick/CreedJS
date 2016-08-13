var UserModel = require('./models/User');

module.exports = class Register {
  
  constructor(user) {
    this.model = new UserModel(user);
  }
  
  save() {
    this.model.save();
  }
};