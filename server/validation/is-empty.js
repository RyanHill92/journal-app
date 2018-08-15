const expect = require('expect');

//Utility function to check for any kind of emptiness.
//Used in conjunction with validation handlers for new user/login.
function isEmpty (value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0) ||
    value.length === 0
  );
}

module.exports = isEmpty;
