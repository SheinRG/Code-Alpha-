import React from 'react';
import ValidationMessage from './ValidationMessage';

const FormField = ({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder = '',
  className = '',
  maxLength,
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-text-dark">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-3 py-2 border rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error 
            ? 'border-error bg-red-50' :'border-gray-200 bg-white hover:border-gray-300'
        }`}
        {...props}
      />
      {error && <ValidationMessage message={error} type="error" />}
    </div>
  );
};

export default FormField;