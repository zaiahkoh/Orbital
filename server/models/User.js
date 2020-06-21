const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  socialLogin: {
    type: String,
    required: true,
    enum: ['facebook', 'google']
  },
  password: {
    type: String,
  },
  residential: {
    type: String,
  },
  modPlan: {
      type: Object
  }
});

module.exports = User = mongoose.model("users", UserSchema);