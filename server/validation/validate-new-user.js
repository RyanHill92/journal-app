const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNewUser (data) {
  let errors = {};

  //Any empty or non-existent fields in body set equal to empty strings.
  //This way, validator method below can handle them.
  data.password = !isEmpty(data.password) ? data.password : '' ;
  data.confirm = !isEmpty(data.confirm) ? data.confirm : '';
  data.email = !isEmpty(data.email) ? data.email : '' ;

  if (!validator.isEmail(data.email)) {
    errors.email = 'Must use valid email address.';
  }

  //If no email, this error message overrides previous.
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required.';
  }

  if(!validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password length must be between 6 and 30 characters.';
  }

  //If no password, this error message overrides previous.
  if (validator.isEmpty(data.password)) {
    errors.password = 'Must enter a password.';
  }

  //Require a confirm password field with matching password.
  if(!validator.equals(data.password, data.confirm)) {
    errors.confirm = 'Passwords must match.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
