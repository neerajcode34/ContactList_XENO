const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "name is required"],
  },
  email: {
    type: "string",
    required: [true, "email is required"],
  },
  password: {
    type: "string",
    required: [true, "password is required"],
  },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
