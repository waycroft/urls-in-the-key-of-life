const express = require('express');
const cors = require('cors');
const app = express();
var mongoose = require('mongoose');
require('dotenv').config();

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_STRING);
    console.log('mongoDB connected');
  } catch (error) {
    console.error('mongoDB couldnt connect', error);
  }
}

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use('/api/shorturl', require(process.cwd() + '/routes/api/shorturl'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

connectDb()
.then(() => {
  app.listen(port, function() {
    console.log(`Listening on port ${port}`);
  });
});
