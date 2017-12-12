const express = require('express');
const mongoose = require('mongoose')
const Story = mongoose.model('stories')
const router = express.Router();
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');

router.get('/',ensureGuest, (req, res) => {
  res.render('index');
});
router.get('/about', ensureAuthenticated,  (req, res) => {
  res.render('about');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Story.find({ user: req.user.id })
    .then(stories => {
      res.render('dashboard', {
        stories: stories
      });
    });
});

module.exports = router;