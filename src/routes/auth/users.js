const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../../model/userModel/User');

// Login Routes
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.JWT_SECRET;
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.status(400).send('Invalid Email or Password');
  }

  if (await bcrypt.compare(password, user.password)) {
    // The email and password are correct!

    const token = jwt.sign({ id: user._id, email: user.email }, secret);
    return res.json({ status: "ok", data: token, email: user.email });
  }
  // res.json({ status: 'ok', data: token });
  res.send('Ola! We deyah..');
});

// Sign up Routes
router.post('/signup', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || typeof email !== 'string') {
    return res.status(400).send('Invalid Email or Password');
  }
  if (!password || typeof password !== 'string') {
    return res.status(400).send('Invalid Email or Password');
  }
  if (password.length < 7) {
    return res
      .status(400)
      .send('Password too short! Should be atleast 8 characters long.');
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send('Email already in use');
    }
    res.status(400).send(error);
  }
});

module.exports = router;
