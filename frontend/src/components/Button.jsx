import React from 'react';

const Button = ({ text, type = 'button' }) => {
  return (
    <button type={type} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {text}
    </button>
  );
};

export default Button;
