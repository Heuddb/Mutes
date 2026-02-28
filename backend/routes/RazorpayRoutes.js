const express = require('express');
const OptionalAuth = require('../middleware/OptionalAuth');
const { createRazorpayOrder, verifyPayment } = require('../controller/RazorPayController');

const razorpayRoute = express.Router();

razorpayRoute.post('/create-Order',OptionalAuth,createRazorpayOrder);
razorpayRoute.post('/verify-payment',OptionalAuth,verifyPayment);

module.exports = razorpayRoute;