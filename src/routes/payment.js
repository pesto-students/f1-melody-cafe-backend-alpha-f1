const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');
/* GET users listing. */
router.post('/',paymentController.makePayment);

module.exports = router;
