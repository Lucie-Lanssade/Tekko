const router = require('express').Router();
const Insights = require('../models/Insights.model');
const mongoose = require('mongoose');
const Company = require('../models/company.model');

/* GET  salaries page */
router.get('/', (req, res, next) => {
  res.render('salaries');
});

//Get company page
// router.get('/company', (req, res, next) => {
//   res.render('company');
// });

router.get('/company', async (req, res, next) => {
  try {
    console.log(req.query);
    const allCompanies = await Company.find();

    res.render('company', { allCompanies });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
