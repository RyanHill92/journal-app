const mongoose = require('mongoose');

const notEmpty = function(tags) {
  if (tags.length === 0) {
    return false;
  } else if (tags.length >= 1) {
    return true;
  }
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
  }
});

const Memory = mongoose.model('Memory', MemorySchema);

module.exports = {Memory};
