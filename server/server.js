require('./config/config');

const {mongoose} = require('./db/mongoose');
const {Memory} = require('./db/models/memory');
const moment = require('moment');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('Welcome!');
});

app.post('/memories', (req, res) => {
  let date = moment(req.body.date).format("ddd. MMM Do, YYYY");
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

app.get('/memories', (req, res) => {
  Memory.find({}).then((memories) => {
    res.json(memories);
  });
});

app.listen(process.env.PORT, () => {
  console.log('Server up on ', process.env.PORT);
});

module.exports = {app};
