import React, { Fragment, useEffect, useState } from "react";
import EditProduct from "./EditProduct";

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  // Delete product function
  const deleteProduct = async (id) => {
    try {
      const deleteItem = await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE"
      });

      setProducts(products.filter((product) => product.product_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/products");
      const jsonData = await response.json();

      setProducts(jsonData);
    } catch (err) {
      console.error("Error fetching products:", err.message); // Log error message
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // console.log("Products:", products); // Log products array
  // console.log("Number of Products:", products.length); // Log number of products

  // Transform products array into an object
  const productsObject = products.reduce((acc, product) => {
    acc[product.product_id] = product;
    return acc;
  }, {});

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>SKU</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.sku}</td>
              <td>
                {/* Pass productsObject as prop */}
                <EditProduct products={productsObject} />
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
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListProducts;
