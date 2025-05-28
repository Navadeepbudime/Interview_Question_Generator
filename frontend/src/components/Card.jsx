import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg shadow-md 
        ${hover ? 'transform transition-all duration-300 hover:scale-105 hover:shadow-xl' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 