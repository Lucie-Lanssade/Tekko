const router = require("express").Router();

/* GET  page */
router.get("/", (req, res, next) => {
  res.render("companies");
});

module.exports = router;
