let Users = require("../models/user");

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  create(object) {
    return this.model.create(object);
  }

  get() {
    return this.model.find({});
  }
}

module.exports = new UserRepository(Users);