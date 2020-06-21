const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const providers = require('../config/providers');
const https = require('https');

const validateRegisterInput = require('../utils/register');
const validateLoginInput = require("../utils/login");
const User = require('../models/User');
const { query } = require("express");
const { profileEnd } = require("console");

function createJWT (user, callback) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email
  }
  jwt.sign(
    payload,
    keys.secretOrKey,
    {
      expiresIn: 31556926 // 1 year in seconds
    },
    (err, token) => {
      callback(err, token);
    }
  );
}

router.post('/register', (req, res) => {
  //Form validation
  const {errors, isValid} = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email, socialLogin: 'local' }).then(user => {
    if (user) {
      return res.status(409).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        socialLogin: 'local'
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email: email, socialLogin: 'local' }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        createJWT(user, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          })
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

async function validateWithProvider (network, socialToken) {
  return new Promise((resolve, reject) => {
    const url = providers[network].url;
    const queryString = providers[network].qs + socialToken;
    https.get(url + queryString, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      })
      res.on('end', () => {
        resolve(JSON.parse(data));
      })
    }).on('error', (err) => {
      reject(err);
    })
  })
}

router.post('/sociallogin', (req, res) => {
  var network = req.body.network;
  var token = req.body.token;
  validateWithProvider(network, token).then(profile => {
    if (profile.error) {
      res.status(400).json(profile.error);
    } else {
      User.findOne({email: profile.email, socialLogin: network}).then(user => {
        if (user) {
          createJWT(user, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            })
          });
        } else {
          //Create a new account for the social sign in user
          const newUser = new User({
            name: profile.name,
            email: profile.email,
            socialLogin: network
          });
          //Save new User in database
          newUser.save()
            .then(user => {
              createJWT(user, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                })
              });
            })
            .catch(err => {
              console.log(err);
              res.status(409).json({newaccountissue: 'Failed to create new account'});
            });
        }
      })
    }
  })
});

module.exports = router;