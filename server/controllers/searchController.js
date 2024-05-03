const pool = require('../db.js'); // Import the pool instance from the parent directory

const searchProduct = async (req, res) => {
    const { name, description } = req.body;
    const searchTerm = `%${name || description}%`;

    try {
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

module.exports = {
    searchProduct: searchProduct,
}