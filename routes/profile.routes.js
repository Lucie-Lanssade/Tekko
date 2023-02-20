const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");

/* GET  page */
router.get("/", (req, res, next) => {
  res.render("profile");
});

module.exports = router;

module.exports = router;
