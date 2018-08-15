require('./config/config');
//Third-party libraries.
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');

//Express Router modules.
const memories = require('./routes/memories');
const users = require('./routes/users');

//Create the app.
const app = express();
//Use body parser middleware.
app.use(bodyParser.json());
app.use(cors());

//Main GET / route.
app.get('/', (req, res) => {
  res.json({message: 'Welcome!'});
});

//Routes
app.use('/api/memories', memories);
app.use('/api/users', users);

app.listen(process.env.PORT, () => {
  console.log('Server up on ', process.env.PORT);
});

module.exports = {app};
