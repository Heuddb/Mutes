const express = require("express");
const OptionalAuth = require("../middleware/OptionalAuth");
const { getMyOrders, prepareOrder } = require("../controller/OrderController");
const orders = express.Router();

orders.get('/my-orders',OptionalAuth,getMyOrders);
orders.post('/prepare-order',OptionalAuth,prepareOrder);

module.exports = orders;