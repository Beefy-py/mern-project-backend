const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  username: { type: String, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

  id: { type: String },
});

module.exports.User = mongoose.model("User", userSchema);
