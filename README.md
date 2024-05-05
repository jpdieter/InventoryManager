## InventoryManager

![InventoryManager Image](client/public/InventoryManager.png)

## Overview

Inventory Manager is a web application designed for efficient inventory management, offering features for adding, updating, and deleting products, as well as detailed product information and robust search capabilities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Set up the Database](#set-up-the-database)
- [Set up the Client and Server](#set-up-the-client-and-server)
- [Contributing](#contributing)

## Features

- **Product Management:** Add, update, and delete products from the inventory.
- **Detailed Product Information:** View detailed information about each product, including name, description, price, quantity, and SKU.
- **Search Functionality:** Easily locate products by searching through product names or descriptions, providing users with a convenient way to find what they need.
- **Responsive Design:** The app is built with a responsive design, ensuring a seamless experience across various devices and screen sizes.

## Technologies Used

- **Frontend**: React, Bootstrap.
- **Backend**: Node.js, Express.js for server-side logic and Passport.js for authentication middleware.
- **Database**: PostgreSQL.
- **Version Control**: Git for version control, with GitHub for repository hosting.

## Set up the Database

- Use SQL Shell (psql) and follow the prompts to connect to your local PostgreSQL database.
    Choose a name for your database and note it down for use during setting up .env, and run the         following commands (replace inventorymanager with your preferred database name):
  
1.  CREATE DATABASE inventorymanager;
2.  \c inventorymanager;
3.  CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    quantity REAL NOT NULL,
    SKU VARCHAR(50) NOT NULL
);

## Set up the Client and Server

1. Clone the repo
   ```bash
   git clone https://github.com/jpdieter/InventoryManager.git
   ```
2. Navigate to the InventoryManager directory.

3. Navigate to the server directory.

4. Install server dependencies:

   ```bash
   npm install

5. Create env variable   

     ```bash
   touch .env

6. Within the .env file, configure the following variables for your postgreSQL database:
   
   PGDATABASE= The name of the specific Database to be used. This is the name you chose while creating the database earlier.
   
   PGUSER= The root user of your local PostgreSQL database (usually should be postgres, depends on the installation).
   
   PGPASSWORD= The password of your root database user (the same one that you used to connect to PostgreSQL using psql).
   
   PGHOST= The host of your local PostgreSQL database (should be localhost).
   
   PGPORT= The PORT number of your local PostgreSQL database (usually should be 5432, depends on the installation).

    Save the file.
 
5. Start the server:

   ```bash
   nodemon index.js   
   ```

6. Open a new terminal and navigate to the client directory.

7. Install client dependencies:

   ```bash
   npm install

8. Start the client:

   ```bash
   npm start   
   ```   

9. Open the app in your web browser:

   ```
   http://localhost:3000
   ```

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please fork the repository, make your changes, and submit a pull request.
