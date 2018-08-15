const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLogin (data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : '' ;
  data.email = !isEmpty(data.email) ? data.email : '' ;

  if (!validator.isEmail(data.email)) {
    errors.email = 'Must use valid email address.';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required.';
  }

  if (!validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password length must be between 6 and 30 characters.';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Must enter a password.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
