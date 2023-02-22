const router = require('express').Router();
const Insights = require('../models/Insights.model');
const mongoose = require('mongoose');

/* GET  page */
router.get('/', (req, res, next) => {
  res.render('companies');
});

module.exports = router;
