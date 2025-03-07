import React from "react";
import "./LoadingSpinner.css"; // You'll need to create this file

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <span className="spinner-text">Updating...</span>
    </div>
  );
};

export default LoadingSpinner;
