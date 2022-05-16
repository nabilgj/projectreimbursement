import React from 'react';
import './Spinner.css';

// inside loading form
export const Spinner: React.FC = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};
