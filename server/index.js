const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');
require('dotenv').config()
const productRouter = require('./routes/products');

// Your application code goes here

//middleware
app.use(cors());
app.use(express.json());
app.use('/products', productRouter)

app.listen(4000, () =>{
    console.log('Server has started on port 4000!')
})