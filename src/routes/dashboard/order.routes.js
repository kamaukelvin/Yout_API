'use strict';
const express = require('express');
const orderController = require('../../controllers/dashboard/order.controller');
const router = express.Router();

// Retrieve all orders
router.get('/orders', orderController.findAll);
// Create a new order
router.post('/orders', orderController.create);
// Retrieve a single order by id
router.get('/order/:id', orderController.findOne);
// Update an order by id
router.put('/order/:id', orderController.update);
// Delete an order by id
router.delete('/order/:id', orderController.delete);

module.exports = router;
