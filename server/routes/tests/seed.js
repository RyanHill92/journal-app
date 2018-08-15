const {ObjectId} = require('mongodb');
const {Memory} = require('./../../db/models/memory');
const moment = require('moment');

const testMemories = [
  {
    date: moment([1992, 8, 1]).format("ddd. MMM Do, YYYY"),
    location: 'Pittsburgh, PA',
    placeId: "ChIJA4UGSG_xNIgRNBuiWqEV-Y0",
    text: 'I remember the day I was born.',
    tags: ['origins', 'family'],
    _id: new ObjectId()
  },
  {
    date: moment([1994, 10, 1]).format("ddd. MMM Do, YYYY"),
    location: 'Nashville, TN',
    placeId: "ChIJPZDrEzLsZIgRoNrpodC5P30",
    text: 'I remember the day I became a big brother.',
    tags: ['childhood', 'family'],
    _id: new ObjectId()
  }
];


const populateMemories = done => {
  Memory.remove({}).then(() => {
    return Memory.insertMany(testMemories);
  }).then(() => {
    done();
  });
};

module.exports = {testMemories, populateMemories};
