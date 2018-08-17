'use strict';

const mongoose = require('mongoose');

const notEmpty = function(arr) {
  return arr.length >= 1;
}

//If memory is from current date, leave blank to trigger default.
const MemorySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: [true, 'Must include a valid location.'],
    trim: true
  },
  placeId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: [true, 'Must include a text description of the memory.'],
    minLength: 1,
    trim: true
  },
  tags: {
    type: Array,
    required: true,
    validate: [notEmpty, 'Please add at least one tag.']
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Memory = mongoose.model('Memory', MemorySchema);

module.exports = {Memory};
