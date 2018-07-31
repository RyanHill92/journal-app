const mongoose = require('mongoose');
const moment = require('moment');

const MemorySchema = new mongoose.Schema({
  date: {
    type: String,
    default: moment().format("ddd. MMM Do, YYYY")
  },
  location: {
    type: String,
    default: 'N/A'
  },
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  tags: {
    type: Array,
    required: true,
    minLength: 1
  }
});

const Memory = mongoose.model('Memory', MemorySchema);

module.exports = {Memory};
