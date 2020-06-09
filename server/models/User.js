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
  password: {
    type: String,
    required: true
  },
  residential: {
    type: String,
    required: true
  },
  graduationYear: {
      type: String,
      required: true
  },
  modPlan: {
      type: Object
  }
});
module.exports = User = mongoose.model("users", UserSchema);