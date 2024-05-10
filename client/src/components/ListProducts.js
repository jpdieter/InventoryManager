import React, { Fragment, useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const SearchAndListProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);

// Use process.env.REACT_APP_LOCAL_BACKEND_URL and process.env.REACT_APP_PROD_BACKEND_URL
const apiUrl = process.env.NODE_ENV === 'production' ?
    process.env.REACT_APP_PROD_BACKEND_URL :
    process.env.REACT_APP_LOCAL_BACKEND_URL;
console.log('API URL:', apiUrl);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Search API URL:", `${apiUrl}/search`);
      const response = await fetch(`${apiUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: searchTerm }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the search results state
        setSearchResults(data);
      } else {
        console.error('Search request failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending search request:', error);
    }
  };

  const getProducts = async () => {
    try {
      console.log("Products API URL:", `${apiUrl}/products`);
      const response = await fetch(`${apiUrl}/products`);
      const jsonData = await response.json();

      setProducts(jsonData);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      console.log("Delete Product API URL:", `${apiUrl}/products/${id}`);
      const deleteItem = await fetch(`${apiUrl}/products/${id}`, {
        method: "DELETE"
      });

      setProducts(products.filter((product) => product.product_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log("Fetching products...");
    getProducts();
  }, []); // Fetch products only once when the component mounts

  return (
    <Container fluid>
      <div className="row justify-content-center">
        <Form className="col-md-6 d-flex mb-3 mt-5" onSubmit={handleSearchSubmit}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>
      </div>
      <div className="table-responsive">
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>SKU</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <tr key={product.product_id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.sku}</td>
                <td>
                  {/* Pass the individual product as a prop */}
                  <EditProduct product={product} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.sku}</td>
                <td>
                  {/* Pass the individual product as a prop */}
                  <EditProduct product={product} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </Container>
  );
};

export default SearchAndListProducts;
