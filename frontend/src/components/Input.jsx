import React from 'react';

const Input = ({ type, name, id, placeholder, value, onChange, Icon = false }) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {name}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={id}
          className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {Icon && (
          <span className="absolute inset-y-0 right-4 inline-flex items-center">
            <Icon />
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
