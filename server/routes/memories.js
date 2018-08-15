const express = require('express');
const router = express.Router();

//DB and Memory model.
const {Memory} = require('./../db/models/memory');
const mongoose = require('./../db/mongoose');

//Local utility modules
const {momentMaker} = require('./../utils/moment-maker');
const {getAddress} = require('./../utils/get-address');
const validateMemory = require('./../validation/validate-memory');

// @route GET api/memories
// @desc Get all memories
// @access Public
router.get('/', (req, res) => {
  Memory.find({}).then((memories) => {
    res.json({message: 'Retrieved all memories.', memories});
  }).catch((err) => res.json(err));
});


// @route POST api/memories
// @desc Route to post new Memory instance
// @access Public
router.post('/', (req, res) => {
  const {isValid, errors} = validateMemory(req.body);

  if (!isValid) {
    return res.status(400).send(errors);
  }

  //This function returns either an address OR one of several custom error messages.
  getAddress(req.body.location).then((address) => {
    //Defaults to current date if no data provided.
    let date = momentMaker(req.body.date);
    let memory = new Memory({
      text: req.body.text,
      location: address.location,
      placeId: address.placeId,
      tags: req.body.tags,
      date
    });
    return memory.save();
  }).then((memory) => {
    res.status(200).json({message: 'Memory stored.', memory});
  }).catch((err) => {
    //If no message field, because string thrown by getAddress.
    let errorMessage = err.message || err;
    res.status(400).json({errorMessage});
  });
});

// @route GET api/memories/:tag
// @desc Filter all memories by a given tag
// @access Public
router.get('/:tag', (req, res) => {
  let tag = req.params.tag;
  //This query checks for docs whose tags array contains the tag element.
  Memory.find({tags: tag}).then((memories) => {
    if (memories.length === 0) {
      return res.status(404).json({errorMessage: `Unable to find any memories tagged as '${tag}.'`});
    }
    res.json({message: `Retrieved all memories tagged as '${tag}.'`, memories});
  }).catch((err) => res.status(400).json(err));
});

module.exports = router;
