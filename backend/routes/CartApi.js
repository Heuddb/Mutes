const express = require('express');
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controller/CartController');
const OptionalAuth = require('../middleware/OptionalAuth');

const cart = express.Router();

// Apply optional auth to all cart routes
// This allows logged-in users to have req.user set from JWT,
// while still allowing guests to use guestId
cart.get('/cart', OptionalAuth, getCart);
cart.post('/cart/add', OptionalAuth, addToCart);
cart.put('/cart/update', OptionalAuth, updateCartItem);
cart.delete('/cart/remove/', OptionalAuth, removeFromCart);

module.exports = cart;
