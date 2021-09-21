'use strict';
const express = require('express');
const { upload } = require('../../helpers/filehelper');
const {
  singleFileUpload,
} = require('../../controllers/dashboard/fileuploadController');
const router = express.Router();

router.post('/singleFile', upload.single('file'), singleFileUpload);

module.exports = router;
