const router = require("express").Router();
const Company = require("../models/company.model");
const User = require("../models/User.model");

/* GET  page */
router.get("/", async (req, res, next) => {
  const allCompanies = await Company.find();
  res.render("profile", { allCompanies });
});

/* GET buffer page */
router.get("/buffer", (req, res) => {
  res.render("buffer");
});

module.exports = router;
