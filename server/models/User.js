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
    enum: ['facebook', 'google', 'local']
  },
  password: {
    type: String
  },
  residential: {
    type: String
  },
  major: {
    type: String
  }, 
  matriculationYear: {
    type: String
  },
  targetGradYear: {
    type: String
  },
  transcript: {
    type: Array
  },
  modPlan: {
      type: Array
  },
  cap: {
    type: Number
  },
  specialisation: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);