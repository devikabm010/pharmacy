import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import checkAuth from "../src/Components/store/checkAuth";
function App() {
  return (
    <div>
     <Navbar /> 
     <div className='name'>
      <h1>MEDICO</h1>
      <h5>A virtual pharmacy</h5>
      </div>
     <div className="container">
  <div className="row">
    <div className="col-md-6 offset-md-3"> 
    </div>
  </div>
</div>
    </div>
  );

}

export default checkAuth(App);