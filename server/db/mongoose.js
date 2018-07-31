const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, function (err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to ', process.env.MONGODB_URI);
  }
});

module.exports = {mongoose};
