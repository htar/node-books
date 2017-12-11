const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load  Models 
require('./models/User');
require('./models/Story');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//Load Keys
const keys = require('./config/keys');

// Pug Middleware
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


//Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connect 
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Save global vares
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

app.listen(port, () => {
  console.log(`Server started on  port ${port}`);
});