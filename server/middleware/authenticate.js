'use strict';

const {User} = require('./../db/models/user');
const jwt = require('jsonwebtoken');
const secret = process.env.jwt_secret;

const authenticate = function (req, res, next) {
  let token;

  if (!req.header('x-auth')) {
    return res.status(401).json({security: 'Authentication required.'});
  } else {
    token = req.header('x-auth');
  }

  let decoded;

  //The other jwt error object has name JsonWebTokenError and may include one of several messages.
  try {
    decoded = jwt.verify(token, secret);
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      //Without return here, Node threw errors about setting headers/modifying res after res sent.
      return res.status(401).json({security: 'Token expired. Please log in to refresh.'});
    } else {
      return res.status(401).json({security: e.message.toUpperCase()});
    }
  }
  //Adding properties straight onto req rather than req.body so as not to interfere with incoming data.
  req.email = decoded.email;
  req._id = decoded._id;
  next();
}

module.exports = {authenticate};
