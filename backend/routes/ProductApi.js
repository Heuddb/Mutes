const express = require('express');
const { getAllProducts, getProductById, getProductsByCategory } = require('../controller/ProductController');

const products = express.Router();

// Get all products with pagination, filters, and search
products.get('/products', getAllProducts);

// Get single product by ID
products.get('/products/:id', getProductById);

module.exports = products;
