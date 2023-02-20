const router = require('express').Router();
const insights = require('../models/insights.model');
const mongoose = require('mongoose');

/* GET  page */
router.get('/', (req, res, next) => {
  res.render('salaries');
});

module.exports = router;
