require('./config/config');
//Third-party libraries.
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

//Express Router modules.
const memories = require('./routes/memories');

//Create the app.
const app = express();
//Use body parser middleware.
app.use(bodyParser.json());

//Main GET / route.
app.get('/', (req, res) => {
  res.json({message: 'Welcome!'});
});

//Routes
app.use('/api/memories', memories)

app.listen(process.env.PORT, () => {
  console.log('Server up on ', process.env.PORT);
});

module.exports = {app};
