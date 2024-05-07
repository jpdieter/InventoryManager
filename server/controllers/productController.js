const pool = require('../db.js');
const { validationResult, body } = require('express-validator');

// Get all products
const getProducts = async (req, res) => {
    try {
        const allProducts = await pool.query('SELECT * FROM products');
        res.json(allProducts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Validation middleware for product creation
const validateProductCreation = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description cannot be empty'),
    body('quantity').isInt().withMessage('Quantity must be an integer'),
    body('sku').notEmpty().withMessage('SKU cannot be empty'),
];

// Create a product
const createProduct = async (req, res) => {
    try {
        // Validation middleware
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, price, description, quantity, sku } = req.body;
        const newProduct = await pool.query(
            'INSERT INTO products (name, price, description, quantity, sku) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, price, description, quantity, sku]
        );
        res.json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
        res.json(product.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Validation middleware for product update
const validateProductUpdate = [
  body('name').notEmpty().withMessage('Name cannot be empty if provided'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('quantity').optional().isInt().withMessage('Quantity must be an integer'),
  body('sku').optional().notEmpty().withMessage('SKU cannot be empty'),
]

// Update product
const updateProduct = async (req, res) => {
    try {
        // Validation middleware
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { name, price, description, quantity, sku } = req.body;
        const updateProduct = await pool.query(
            'UPDATE products SET name = $1, price = $2, description = $3, quantity = $4, sku = $5 WHERE product_id = $6',
            [name, price, description, quantity, sku, id]
        );
        res.json("Product was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
        res.json('Product was deleted!');
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    index: getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    validateProductCreation,
    validateProductUpdate,
};
