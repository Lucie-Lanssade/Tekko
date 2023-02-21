const router = require("express").Router();
const Insights = require("../models/Insights.model");
const mongoose = require("mongoose");
const Company = require("../models/company.model");


/* GET  salaries page */
router.get("/", (req, res, next) => {
  res.render("salaries");
});

router.get('/company', async (req, res, next) => {

  try {
    console.log(req.query);
    let oneCompany = null;
    let reviews = null;
    let globalNote = null;
    const allCompanies = await Company.find();
    // console.log(allCompanies);

    if (req.query.company) {
      oneCompany = await Company.findById(req.query.company);
      reviews = await Insights.find({ company: req.query.company });
      globalNote =
        reviews.reduce((acc, val) => {
          return acc + val.company_note;
        }, 0) / reviews.length;
    }


    res.render('company', { allCompanies, oneCompany, reviews, globalNote });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
