const express = require("express");
const router = express.Router();
const User = require('../models/User');
const extractToken = require("passport-jwt").ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey = require('../config/keys').secretOrKey;
const jwt = require('jsonwebtoken');

module.exports = router;

function verifyAndGetUser(req, callback) {

}

router.get('/', (req, res) => {
  var user = req.user;
  user.password = undefined;
  res.send(user);
});

router.put('/', (req, res) => {
  var jwtPayload = jwt.verify(extractToken(req), secretOrKey);
  if (!jwtPayload.email) {
    res.status(400).json({ tokenError: 'Missing email tag in token payload'})
  } else {
    User.findOne({email: jwtPayload.email}).then(user => {
      if (!user) {
        res.status(404).json({ emailnotfound: 'Email not found' })
      } else {
        
      }
    })
  }
})