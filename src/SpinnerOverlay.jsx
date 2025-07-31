import React from 'react';
import './HomePage.css'; // Import the CSS

const SpinnerOverlay = ({ show }) => {
  return (
    <div className={`spinner-overlay ${show ? 'show' : ''}`}>
      <div className="spinner-content">
        <div className="spinner-wheel"></div>
        <p>Loading game...</p>
      </div>
    </div>
  );
};

export default SpinnerOverlay;