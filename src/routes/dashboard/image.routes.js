const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Retrieve all users
router.post('/pic', (req, res) => {
  const storage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
      cb(null, file.filename + 'by_denno' + path.extname(file.originalname));
    },
  });

  const upload = multer({
    storage: storage,
  }).single('image');

  upload(req, res, (err) => {
    if (err) {
      throw err;
    } else {
      res.send(req.file);
    }
  });
});
// Create a new user

module.exports = router;
