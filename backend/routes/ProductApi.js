const express = require('express');
const { getAllProducts, getProductById, getProductsByCategory } = require('../controller/ProductController');

const products = express.Router();

products.get('/products',getAllProducts)
products.get('/products/:id',getProductById)

module.exports = products;
