const express = require('express');
const { getWishList, postWishList, deleteWishList, moveToCart } = require('../controller/WhishListController');
const OptionalAuth = require('../middleware/OptionalAuth');


const wishList = express.Router();

// Use OptionalAuth so routes work for both guests and authenticated users
wishList.get('/wishlist', OptionalAuth, getWishList);
wishList.post('/wishlist/add', OptionalAuth, postWishList);
wishList.delete('/wishlist/remove', OptionalAuth, deleteWishList);
wishList.post('/wishlist/moveToCart', OptionalAuth, moveToCart);

module.exports = wishList;