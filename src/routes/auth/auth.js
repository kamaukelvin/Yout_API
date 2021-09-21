const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../../model/userModel/User');
const IntializePassport = require('../../passport/passport-config');
IntializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

// Login Routes
router.get('/', checkAuthenticated, (req, res) => {
  res.send('Hooray!');
});

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.send('Welcome to the Login Page!');
});

router.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

// Sign up Routes
router.get('/signup', checkNotAuthenticated, (req, res) => {
  res.send('Welcome to the Sign Up Page!');
});

router.post('/signup', checkNotAuthenticated, async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });
  // console.log(user);
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

// Get all subscribers

// router.get('/', async (req, res) => {
//   try {
//     const subscribers = await Subscriber.find()
//     res.json(subscribers)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// });

module.exports = router;
