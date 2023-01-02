import React from 'react';

const Input = ({ type, name, id, placeholder, value, onChange, Icon = false }) => {
  return (
    <div>
      <label htmlFor={id} class="sr-only">
        {name}
      </label>
      for
      <div class="relative">
        <input
          type={type}
          name={name}
          id={id}
          class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {Icon && (
          <span class="absolute inset-y-0 right-4 inline-flex items-center">
            <Icon />
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
