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

// POST login page*/
router.post("/login", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    //Check if all fields are filled. If not, return login page.
    if (!name || !email || !password) {
      return res.render("auth/login", {
        errorMessage: "Please fill out all the fields",
      });
    }
    //Check if account exists. If not, return login page.
    const foundUser = await User.findOne(
      { name: name },
      { name: 1, email: 1, password: 1 }
    );
    if (!foundUser) {
      return res.render("auth/login", {
        errorMessage: "This account does not exist. Please sign up first.",
      });
    }
    //checks if the user put the right password. If not, return login page
    // const bcrypt = require('bcryptjs');
    const matchingPass = await bcrypt.compare(password, foundUser.password);
    if (!matchingPass) {
      return res.render("auth/login", {
        errorMessage: "wrong password. Please try again",
      });
    }
    req.session.currentUser = foundUser;
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});
//POST logout
router.post("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("login");
  });
});

//POST logout
//change commit

module.exports = router;
