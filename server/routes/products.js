const express = require('express');
const router = express.Router();
// const { getProducts } = require('../controllers/productController'); // Import the getProducts function from the controller
const products_controller = require('../controllers/productController');

// Define the route handler for GET requests to '/'
router.get('/', products_controller.index);

// Create a product
router.post('/', products_controller.createProduct);

// Get product by id
router.get('/:id', products_controller.getProductById); // Change the handler function to getProductById

// Update a product
router.put('/:id', products_controller.updateProduct);

// Delete a product
router.delete('/:id', products_controller.deleteProduct);

module.exports = router;