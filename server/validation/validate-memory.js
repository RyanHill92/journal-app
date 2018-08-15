const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMemory (data) {
  let errors = {};

  data.location = !isEmpty(data.location) ? data.location : '' ;
  data.text = !isEmpty(data.text) ? data.text : '';

  if (validator.isEmpty(data.location)) {
    errors.location = 'Please include a location.';
  }

  if (validator.isEmpty(data.text)) {
    errors.text = 'Please include a description of your memory.';
  }

  if (isEmpty(data.tags)) {
    errors.tags = 'Please tag your memory with at least one descriptor.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
