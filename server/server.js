require('./config/config');

const {mongoose} = require('./db/mongoose');
const {Memory} = require('./db/models/memory');
const moment = require('moment');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.header({'Access-Control-Allow-Origin':'*'}).json({message: 'Welcome!'});
});

app.post('/memories', (req, res) => {
  let date = req.body.date;
  //Account for zero-indexed months.
  date[1] = date[1] - 1;
  date = moment(date).format("ddd. MMM Do, YYYY");
  let memory = new Memory({
    text: req.body.text,
    location: req.body.location,
    tags: req.body.tags,
    date
  });
  memory.save().then((memory) => {
    res.status(200).header({'Access-Control-Allow-Origin':'*'}).json(memory);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

app.get('/memories/:tag', (req, res) => {
  let tag = req.params.tag;
  //This query checks for docs whose tags array contains the tag element.
  Memory.find({tags: tag}).then((memories) => {
    res.json(memories);
  }).catch((err) => res.json(err));
});

app.get('/memories', (req, res) => {
  Memory.find({}).then((memories) => {
    res.json(memories);
  }).catch((err) => res.json(err));
});

app.listen(process.env.PORT, () => {
  console.log('Server up on ', process.env.PORT);
});

module.exports = {app};
