require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  // Use the provided port or default to 5432
    database: process.env.DB_NAME  // Use the provided database name or default to 'inventorysystem'
});

// Validate the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully!');
  }
});

module.exports = pool;
