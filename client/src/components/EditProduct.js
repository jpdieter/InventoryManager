import React, { Fragment, useState, useEffect } from "react";

const EditProduct = ({ product }) => {
  console.log("Product:", product); 
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);
  const [sku, setSku] = useState(product.sku);

  // Define backend URLs for development and production
  const apiUrl = process.env.NODE_ENV === 'production' ?
    process.env.REACT_APP_PROD_BACKEND_URL :
    process.env.REACT_APP_LOCAL_BACKEND_URL;

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setQuantity(product.quantity);
    setSku(product.sku);
  }, [product]);

  const updateProduct = async (id) => {
    try {
      const updatedProduct = { name, price, description, quantity, sku };
      await fetch(`${apiUrl}/products/${id}`, { // Updated URL
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${product.product_id}`}
      >
        Edit
      </button>
      <div className="modal" id={`id${product.product_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Product</h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={() => updateProduct(product.product_id)}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProduct;
