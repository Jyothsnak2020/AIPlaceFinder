// src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin h-6 w-6 border-t-4 border-black border-solid rounded-full"></div>
  </div>
);

export default LoadingSpinner;
