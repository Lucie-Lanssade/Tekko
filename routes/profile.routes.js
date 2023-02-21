const router = require("express").Router();
const User = require("../models/User.model");

/* GET  page */
router.get("/", (req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  res.render("profile");
});

module.exports = router;
