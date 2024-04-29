CREATE DATABASE inventorysystem;

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL
);