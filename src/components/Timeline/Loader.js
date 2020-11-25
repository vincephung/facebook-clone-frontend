import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '../../styles/loader.css';
const Loader = () => {
  return (
    <div className="loaderContainer">
      <h1>Loading...</h1>
      <Spinner animation="border" variant="primary" role="status"></Spinner>
    </div>
  );
};

export default Loader;
