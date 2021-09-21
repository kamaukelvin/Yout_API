const express = require('express');
const router = express.Router();
const {
  mpesaPassword,
  token,
  stkPush,
  callback,
} = require('../../controllers/mpesa/mpesaController');

router.get('/password', mpesaPassword);
router.post('/stkpush', token, stkPush);
router.post('/stk_callback', callback);

module.exports = router;
