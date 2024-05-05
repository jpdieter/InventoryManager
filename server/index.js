const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');
require('dotenv').config()
const productRouter = require('./routes/products');
const searchRouter = require('./routes/search');
const compression = require("compression");
const helmet = require('helmet');

//Middleware
// app.use(cors());
app.use(express.json());
app.use(compression()); // Compress all routes

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
windowMs: 1 * 60 * 1000, // 1 minute
max: 40,
validate: {xForwardedForHeader: false},
});
// Apply rate limiter to all requests
app.use(limiter);    

app.use(helmet()); //Helmet to protect against well-known web vulnerabilities
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
      },
    })
  );

//Routes
app.use('/products', productRouter)
app.use('/search', searchRouter)

//Start server
app.listen(4000, () =>{
    console.log('Server has started on port 4000!')
})