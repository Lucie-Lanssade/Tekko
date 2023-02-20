const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
/* POST signup page */

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  console.log({ username, password });
  try {
    if (!username || !password) {
      return res.render("auth/signup", {
        errorMessage: "Please fill out all of the fields!",
      });
    }
    if (password.length < 6) {
      return res.render("auth/signup", {
        errorMessage: "Please put a longer password",
      });
    }
    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      return res.render("auth/signup", {
        errorMessage: "Theres another one of you!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userToCreate = {
      username,
      password: hashedPassword,
    };
    const userFromDb = await User.create(userToCreate);
    console.log(userFromDb);
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});

/* GET  login page */
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
// POST login page*/

//POST logout
//change commit

module.exports = router;
