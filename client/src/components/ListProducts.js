import React, { Fragment, useEffect, useState } from "react";
import EditProduct from "./EditProduct";

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  //delete productfunction

  const deleteProduct = async id => {
    try {
      const deleteItem = await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE"
      });

      setProducts(products.filter(products => products.product_id !== id));
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
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {products.map(product => (
            <tr key={product.product_id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <EditProduct products={products} />
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