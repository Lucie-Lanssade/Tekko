const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

/* GET signup page */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup', { stylesheets: ['auth'] });
});

/* POST signup page */
router.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;

  console.log({ name, email, password });
  try {
    if (!name || !password || !email) {
      return res.render('auth/signup', {
        errorMessage: 'Please fill out all of the fields!',
      });
    }
    //les requirements pour permettre de ne pas mettre n'importe quelle adresse
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return res.render('auth/signup', {
        errorMessage: 'Error mail ! Try again',
      });
    }
    if (password.length < 6) {
      return res.render('auth/signup', {
        errorMessage: 'Please put a longer password',
      });
    }
    const foundUser = await User.findOne({ name: name });
    if (foundUser) {
      return res.render('auth/signup', {
        errorMessage: 'Theres another one of you!',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userToCreate = {
      name,
      email,
      password: hashedPassword,
    };
    const userFromDb = await User.create(userToCreate);
    console.log(userFromDb);
    res.redirect('/auth/login');
  } catch (error) {
    next(error);
  }
});

/* GET  login page */
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

// POST login page*/
router.post('/login', async (req, res, next) => {
  const { name, password } = req.body;
  try {
    //Check if all fields are filled. If not, return login page.
    if (!name || !password) {
      return res.render('auth/login', {
        errorMessage: 'Please fill out all the fields',
      });
    }
    //Check if account exists. If not, return login page.
    const foundUser = await User.findOne(
      { name: name },
      { name: 1, password: 1 }
    );
    if (!foundUser) {
      return res.render('auth/login', {
        errorMessage: 'This account does not exist. Please sign up first.',
      });
    }
    //checks if the user put the right password. If not, return login page
    // const bcrypt = require('bcryptjs');
    const matchingPass = await bcrypt.compare(password, foundUser.password);
    if (!matchingPass) {
      return res.render('auth/login', {
        errorMessage: 'wrong password. Please try again',
      });
    }
    req.session.currentUser = foundUser;
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});
//POST logout
router.post('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
});

module.exports = router;
