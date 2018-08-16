const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.jwt_secret;

const UserSchema = new mongoose.Schema({
  //The unique field below keeps me from having to manually check for duplicates.
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 1,
    validate: [validator.isEmail, 'Please enter a valid email address.']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

//After saving a user doc, we don't want to send back all of its fields.
//We want to keep passwords and tokens from displaying.
UserSchema.methods.toJSON = function () {
  let userObject = this.toObject();
  return {
    email: userObject.email,
    _id: userObject._id
  };
};

//'This' will be the individual document.
UserSchema.methods.generateToken = function () {
  let token = jwt.sign({_id: this._id.toHexString(), email: this.email}, secret, {expiresIn: '1h'});

  return token;
}

UserSchema.methods.clearToken = function () {
  this.token = null;
  return this.save().then(user => {
    return user;
  });
}

UserSchema.statics.findByCredentials = function (email, password) {
  //Here, this is the whole collection created from UserSchema.
  return this.findOne({email}).then(user => {
    if (!user) {
      return Promise.reject({email: 'No user account with that email address exists.'});
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password).then(result => {
        if (result) {
          resolve(user);
        } else {
          reject({password: 'Invalid password for this account.'});
        }
      });
    });
  });
}

//Before a user doc is saved, check to see if password field has been modified.
//This includes if it's just been created or updated.
//If so, set the password field to a hash of that new password.
//Otherwise, carry on with the save.
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
