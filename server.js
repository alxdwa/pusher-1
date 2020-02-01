const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const Pusher = require('pusher');
const pusher = new Pusher({
  appId:'940824',
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster:'ap4'
});

app.post('/message', (req, res) => {
  pusher.trigger('pusher-1', 'message_added', { body: req.body });
  res.status(200).send();
});

const port = 5000;
app.listen(port, () => { console.log(`Listening on port ${port}`)});