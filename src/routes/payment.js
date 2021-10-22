const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');
/* GET users listing. */
router.get('/',paymentController.makePayment);

module.exports = router;
