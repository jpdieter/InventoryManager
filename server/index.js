const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');
require('dotenv').config()

// Your application code goes here

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a product
app.post('/products', async(req, res) => {
    try {
      const { name, price, description, quantity, sku } = req.body;
      const newProduct = await pool.query('INSERT INTO products (name, price, description, quantity, sku) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
      [name, price, description, quantity, sku]
    );
    res.json(newProduct.rows[0]);

    } catch (err) {
      console.error(err.message);  
    }
});

//get all products

app.get('/products', async (req, res) => {
    try {
      const allProducts = await pool.query('SELECT * from products')
      res.json(allProducts.rows)
    } catch (err){
      console.error(err.message);
    }
});

//get a product

app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await pool.query('SELECT * from products WHERE product_id = $1', [id])
        res.json(product.rows[0])
    } catch (err){
      console.error(err.message);
    }
});

//update a product

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, quantity, sku } = req.body; // Include 'name', 'price', and 'description' in the destructuring

        // Update query to include 'name', 'price', and 'description'
        const updateProduct = await pool.query(
            'UPDATE products SET name = $1, price = $2, description = $3, quantity = $4, sku = $5, WHERE product_id = $4',
            [name, price, description, quantity, sku, id]
        );

        res.json("Product was updated!");
    } catch (error) {
        console.error(error.message); // Corrected console error statement
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteProduct = await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
        res.json('Product was deleted!')
    } catch (err){
      console.error(err.message);
    }
});

app.listen(4000, () =>{
    console.log('Server has started on port 4000!')
})