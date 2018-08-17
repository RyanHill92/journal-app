'use strict';

const express = require('express');
const router = express.Router();

//DB and Memory model.
const {User} = require('./../db/models/user');
const mongoose = require('./../db/mongoose');
const validateLogin = require('./../validation/validate-login');
const validateNewUser = require('./../validation/validate-new-user');


router.post('/login', (req, res) => {
  //Validate incoming data before any other processing occurs.
  const {isValid, errors} = validateLogin(req.body);

  //Cuts off here if invalid email format, empty field, etc.
  if (!isValid) {
    return res.status(400).json(errors)
  }

  //Create login object from request body data.
  const login = {
    email: req.body.email,
    password: req.body.password
  };

  //Call custom static method to verify that account exists and email/pass are valid.
  User.findByCredentials(login.email, login.password).then(user => {
    return user.generateToken();
  }).then(token => {
    res.status(200).json({message: 'Logged in', token});
  }).catch(e => {
    //If only one field, custom error object thrown by findByCredentials.
    Object.keys(e).length === 1
      ? res.status(400).json(e)
      : res.status(400).json({errorMessage: e.message});
  });
});

router.post('/register', (req, res) => {
  const {isValid, errors} = validateNewUser(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Create new instance of User model with request body data.
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  //Thanks to UserSchema, the password is hashed before the save.
  //This promise will reject if the email already exists for another user.
  newUser.save().then(user => {
    res.status(200).json(user);
  }).catch(e => {
    e.code == 11000
      ? res.status(400).json({email: 'User account with this email already exists.'})
      : res.status(400).json({errorMessage: e.message});
  });
});

module.exports = router;
