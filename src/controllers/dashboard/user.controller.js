const DashUser = require('../../model/dashboard/user.model');

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  DashUser.find()
    .then((dashusers) => {
      res.send(dashusers);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Something went wrong while getting list of users.',
      });
    });
};
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({ message: 'Please fill all required field' });
  }
  // Create a new User
  const dashuser = new DashUser({
    fullname: req.body.fullname,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  });
  // Save user in the database
  dashuser
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Something went wrong while creating new user.',
      });
    });
};
// Find a single User with a id
exports.findOne = (req, res) => {
  DashUser.findById(req.params.id)
    .then((dashuser) => {
      if (!dashuser) {
        return res
          .status(404)
          .send({ message: 'User not found with id ' + req.params.id });
      }
      res.send(dashuser);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .send({ message: 'User not found with id ' + req.params.id });
      }
      return res
        .status(500)
        .send({ message: 'Error getting user with id ' + req.params.id });
    });
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({ message: 'Please fill all required field' });
  }
  // Find user and update it with the request body
  DashUser.findByIdAndUpdate(
    req.params.id,
    {
      fullname: req.body.fullname,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
    },
    { new: true }
  )
    .then((dashuser) => {
      if (!dashuser) {
        return res
          .status(404)
          .send({ message: 'user not found with id ' + req.params.id });
      }
      res.send(dashuser);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .send({ message: 'user not found with id ' + req.params.id });
      }
      return res
        .status(500)
        .send({ message: 'Error updating user with id ' + req.params.id });
    });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  DashUser.findByIdAndRemove(req.params.id)
    .then((dashuser) => {
      if (!dashuser) {
        return res
          .status(404)
          .send({ message: 'user not found with id ' + req.params.id });
      }
      res.send({ message: 'user deleted successfully!' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res
          .status(404)
          .send({ message: 'user not found with id ' + req.params.id });
      }
      return res
        .status(500)
        .send({ message: 'Could not delete user with id ' + req.params.id });
    });
};
