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


// import './App.css';
// import axios from 'axios';
// import React, {useState, useEffect} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'


// function App() {

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//     .get('http://localhost:4000/products') // Specify the full URL including the port
//     .then(res => res.data)
//     .then(data => setData(data));
//   }, []);

//   return (
//     <div className='container my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//       <table className='table table-striped'>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//           <tbody>
//             { data.map(item => (
//               <tr key={item.product_id}>
//                 <td>{item.product_id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.price}</td>
//                 <td>{item.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table> 
//       </div>
//   )};

// export default App;