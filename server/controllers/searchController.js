const pool = require('../db.js');
const { validationResult, body } = require('express-validator');

const searchProduct = async (req, res) => {
    try {
        // Validation middleware
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description } = req.body;
        const searchTerm = `%${name || description}%`;

        const query = `
            SELECT * 
            FROM products 
            WHERE name ILIKE $1 OR description ILIKE $1;
        `;
        const result = await pool.query(query, [searchTerm]);
        res.json(result.rows); // Sending JSON response
    } catch (error) {
        console.error('Error executing search query:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};

// Validation rules for search parameters
const searchValidationRules = [
    body('name').optional().notEmpty(),
    body('description').optional().notEmpty()
];

module.exports = {
    searchProduct,
    searchValidationRules
};
