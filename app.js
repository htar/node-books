const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;


// Passport Config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');



app.get('/', (req, res) => {
  res.send('It Works!');
});

// Use Routes
app.use('/auth', auth);


app.listen(port, () => {
  console.log(`Server started on  port ${port}`);
});