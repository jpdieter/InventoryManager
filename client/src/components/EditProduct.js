import React, { Fragment, useState } from "react";

const EditProduct = ({ products }) => {
  // State initialization
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sku, setSku] = useState("");

  console.log(products)
  // Function to handle product update
  const updateProduct = async (productId) => {
    try {
      const updatedProduct = {
        name: name,
        price: price,
        description: description,
        quantity: quantity,
        sku: sku
      };

      const response = await fetch(
        `http://localhost:4000/products/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      // Redirect to home page after successful update
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  // Render the component
  return (
    <Fragment>
      {Object.keys(products).map(productId => (
        <div key={productId}>
          <button
            type="button"
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target={`#id${productId}`}
          >
            Edit
          </button>

          <div className="modal" id={`id${productId}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Product</h4>
                  <button type="button" className="close" data-dismiss="modal">
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
                    data-dismiss="modal"
                    onClick={() => updateProduct(productId)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default EditProduct;
