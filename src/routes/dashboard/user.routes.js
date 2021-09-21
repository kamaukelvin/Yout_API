const express = require('express');
const router = express.Router();
const userController = require('../../controllers/dashboard/user.controller');

router.post('/dashlogin', async (req, res) => {
  const { email, password } = req.body;
  const dashuser = await DashUser.findOne({ email }).lean();

  if (!dashuser) {
    return res.status(400).send('Invalid Email or Password');
  }

  if ((await password) === dashuser.password) {
    // The email and password are correct!
    return res.json({ status: 'ok' });
  }
  // res.json({ status: 'ok', data: token });
  res.send('Ola! We deyah..');
});

// Retrieve all users
router.get('/dashusers', userController.findAll);
// Create a new user
router.post('/dashusers', userController.create);
// Retrieve a single user with id
router.get('/dashuser/:id', userController.findOne);
// Update a user with id
router.put('/dashusers/:id', userController.update);
// Delete a user with id
router.delete('/dashusers/:id', userController.delete);

module.exports = router;
