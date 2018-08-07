const express = require('express');
const router = express.Router();

//DB and Memory model.
const {Memory} = require('./../db/models/memory');
const mongoose = require('./../db/mongoose');

//Local module
const {momentMaker} = require('./../utilities/moment-maker');

// @route GET api/memories
// @desc Get all memories
// @access Public
router.get('/', (req, res) => {
  Memory.find({}).then((memories) => {
    res.json(memories);
  }).catch((err) => res.json(err));
});


// @route POST api/memories
// @desc Route to post new Memory
// @access Public
router.post('/', (req, res) => {
  let date = momentMaker(req.body.date);
  let memory = new Memory({
    text: req.body.text,
    location: req.body.location,
    tags: req.body.tags,
    date
  });
  memory.save().then((memory) => {
    res.status(200).json(memory);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// @route GET api/memories/:tag
// @desc Filter all memories by a given tag
// @access Public
router.get('/:tag', (req, res) => {
  let tag = req.params.tag;
  //This query checks for docs whose tags array contains the tag element.
  Memory.find({tags: tag}).then((memories) => {
    res.json(memories);
  }).catch((err) => res.json(err));
});

module.exports = router;
