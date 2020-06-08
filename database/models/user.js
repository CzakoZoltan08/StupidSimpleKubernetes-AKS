let mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
});

const Users = mongoose.model("Users", schema);
module.exports = Users;
