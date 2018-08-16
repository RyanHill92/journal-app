const express = require('express');
const router = express.Router();

//DB and Memory model.
const {Memory} = require('./../db/models/memory');
const mongoose = require('./../db/mongoose');

//Local utility modules
const {momentMaker} = require('./../utils/moment-maker');
const {getAddress} = require('./../utils/get-address');
const validateMemory = require('./../validation/validate-memory');
const {authenticate} = require('./../middleware/authenticate');

// @route GET api/memories
// @desc Get all memories matching user id
// @access Private
router.get('/', authenticate, (req, res) => {
  Memory.find({_creator: req._id}).then((memories) => {
    res.json({message: 'Retrieved all memories belonging to current user.', memories});
  }).catch((err) => res.json(err));
});


// @route POST api/memories
// @desc Route to post new Memory instance
// @access Private
router.post('/', authenticate, (req, res) => {
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
      date,
      //The _id prop is available right off req because of authenticate middleware.
      _creator: req._id
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
// @desc Filter all memories by a given tag for current user
// @access Private
router.get('/:tag', authenticate, (req, res) => {
  let tag = req.params.tag;
  //This query checks for docs whose tags array contains the tag element.
  Memory.find({tags: tag, _creator: req._id}).then((memories) => {
    if (memories.length === 0) {
      return res.status(404).json({errorMessage: `Unable to find any memories tagged as '${tag}' for current user.`});
    }
    res.json({message: `Retrieved all memories tagged as '${tag}' by current user.`, memories});
  }).catch((err) => res.status(400).json(err));
});

module.exports = router;
