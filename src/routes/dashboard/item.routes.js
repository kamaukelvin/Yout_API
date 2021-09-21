'use strict';
const express = require('express');
const { upload } = require('../../helpers/filehelper');
const itemController = require('../../controllers/dashboard/item.controller');
const router = express.Router();

// Retrieve all users
router.get('/items', itemController.findAll);
// Create a new user
router.post('/items', upload.single('image'), itemController.create);
// Retrieve a single user with id
router.get('/item/:id', itemController.findOne);
// Update a user with id
router.put('/item/:id', itemController.update);
// Delete a user with id
router.delete('/item/:id', itemController.delete);

module.exports = router;
