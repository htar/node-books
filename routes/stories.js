const express = require('express');
const router = express.Router();
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');

// Sories Index
router.get('/', (req, res) => {
  res.render('stories/index');
});

// Add Story Form
router.get('/add',ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

// Process Story Form
router.post('/', (req, res) => {
  console.log(req.body,'Story form data');
  // res.render('stories/add');
  res.send('send');
});

module.exports = router;