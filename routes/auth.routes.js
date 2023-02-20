const router = require('express').Router();
const user = require('../models/user.model');
const mongoose = require('mongoose');

/* GET signup page */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});
/* POST signup page */

/* GET  login page */
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});
// POST login page*/

//POST logout
//change commit

module.exports = router;
