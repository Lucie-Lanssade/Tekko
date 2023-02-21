const router = require('express').Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/*links auth, user,profile,insights roots to this page*/

router.use('/auth', require('./auth.routes'));
router.use('/profile', require('./profile.routes'));
router.use('/insights', require('./insights.routes'));

module.exports = router;
