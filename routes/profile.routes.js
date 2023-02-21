const router = require("express").Router();
const User = require("../models/User.model");

/* GET  page */
router.get("/", (req, res, next) => {
  res.render("profile");
});

/* GET buffer page */
router.get("/buffer", (req, res) => {
  res.render("buffer");
});

module.exports = router;
