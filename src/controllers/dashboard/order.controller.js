const Order = require('../../model/dashboard/order.model');

// Retrieve and return all Orders from the database.
exports.findAll = (req, res) => {
  Order.find()
    .then((orders) => {
      res.send(orders);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Something went wrong while getting list of orders.',
      });
    });
};
// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({ message: 'Please fill all required fields' });
  }
  // Create a new Order
  const order = new Order({
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    billData: {
      totalAmount: req.body.billData.totalAmount,
      mealsChosen: [req.body.billData.mealsChosen],
      mealsPerWeek: req.body.billData.mealsPerWeek,
      itemsPicked: {
        title: req.body.billData.itemsPicked.title,
        quantity: req.body.billData.itemsPicked.quantity,
      },
      servingPlan: req.body.billData.servingPlan,
    },
  });
  // Save Order in the database
  order
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Something went wrong while creating new order.',
      });
    });
};
// Find a single Order by id
exports.findOne = (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        return res
          .status(404)
          .send({ message: 'Order not found with id ' + req.params.id });
      }
      res.send(order);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .send({ message: 'Order not found with id ' + req.params.id });
      }
      return res
        .status(500)
        .send({ message: 'Error getting order with id ' + req.params.id });
    });
};
// Update an Order identified by id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({ message: 'Please fill all required fields' });
  }
  // Find Order and update it with the request body
  Order.findByIdAndUpdate(
    req.params.id,
    {
      Fname: req.body.Fname,
      Lname: req.body.Lname,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      billData: {
        totalAmount: req.body.billData.totalAmount,
        mealsChosen: [req.body.billData.mealsChosen],
        mealsPerWeek: req.body.billData.mealsPerWeek,
        itemsPicked: {
          title: req.body.billData.itemsPicked.item.title,
          quantity: req.body.billData.itemsPicked.item.quantity,
        },
        servingPlan: req.body.billData.servingPlan,
      },
    },
    { new: true }
  )
    .then((order) => {
      if (!order) {
        return res
          .status(404)
          .send({ message: 'Order not found with id ' + req.params.id });
      }
      res.send(order);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .send({ message: 'Order not found with id ' + req.params.id });
      }
      return res
        .status(500)
        .send({ message: 'Error updating Order with id ' + req.params.id });
    });
};
// Delete an Order with specified id
exports.delete = (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then((order) => {
      if (!order) {
        return res
          .status(404)
          .send({ message: 'Order not found with id ' + req.params.id });
      }
      res.send({ message: 'Order deleted successfully!' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res
          .status(404)
          .send({ message: 'Order not found with id ' + req.params.id });
      }
      return res.status(500).send({
        message: 'Could not delete Order with id ' + req.params.id,
      });
    });
};
