import React, { Fragment } from "react";
import "./App.css";
import InputProduct from "./components/InputProduct";
import ListProducts from "./components/ListProducts";
import NavScrollExample from "./components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Fragment>
      <NavScrollExample /> {/* Include the navbar component */}
      <div className="container">
        <InputProduct />
        <ListProducts />
      </div>
    </Fragment>
  );
}

export default App;