const express = require('express');
const router = express.Router();
const {ensureAuthenticated,ensureGuest} = require('../helpers/auth');

router.get('/',ensureGuest, (req, res) => {
  res.render('index');
});
router.get('/about', ensureAuthenticated,  (req, res) => {
  res.render('about');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard');
});

module.exports = router;