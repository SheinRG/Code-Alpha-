import React, { useState, forwardRef } from 'react';
import Icon from '../AppIcon';

const Input = forwardRef(({ 
  type = 'text',
  variant = 'default',
  size = 'medium',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  icon,
  iconPosition = 'left',
  error,
  success,
  disabled = false,
  required = false,
  fullWidth = true,
  className = '',
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const baseClasses = 'border rounded-lg transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    default: `
      border-gray-200 
      ${isFocused ? 'border-primary ring-2 ring-primary ring-opacity-20' : ''} 
      ${error ? 'border-error ring-2 ring-error ring-opacity-20' : ''} 
      ${success ? 'border-success ring-2 ring-success ring-opacity-20' : ''}
    `,
    search: `
      border-gray-200 bg-gray-50
      ${isFocused ? 'border-primary ring-2 ring-primary ring-opacity-20 bg-white' : ''} 
    `,
    withIcon: `
      border-gray-200 
      ${isFocused ? 'border-primary ring-2 ring-primary ring-opacity-20' : ''} 
      ${error ? 'border-error ring-2 ring-error ring-opacity-20' : ''} 
      ${success ? 'border-success ring-2 ring-success ring-opacity-20' : ''}
    `
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-3 py-2 text-base',
    large: 'px-4 py-3 text-lg'
  };

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24
  };

  const inputClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${type === 'password' ? 'pr-10' : ''}
    ${className}
  `.trim();

  const iconSize = iconSizes[size];
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-text-dark mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <Icon 
            name={icon} 
            size={iconSize} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle"
          />
        )}
        
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
        
        {icon && iconPosition === 'right' && type !== 'password' && (
          <Icon 
            name={icon} 
            size={iconSize} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-subtle"
          />
        )}
        
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-subtle hover:text-text-primary transition-colors duration-150"
          >
            <Icon 
              name={showPassword ? "EyeOff" : "Eye"} 
              size={iconSize}
            />
          </button>
        )}
        
        {error && (
          <Icon 
            name="AlertCircle" 
            size={iconSize} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-error"
          />
        )}
        
        {success && !error && (
          <Icon 
            name="CheckCircle" 
            size={iconSize} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-success"
          />
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error flex items-center space-x-1">
          <Icon name="AlertCircle" size={14} />
          <span>{error}</span>
        </p>
      )}
      
      {success && !error && (
        <p className="mt-1 text-sm text-success flex items-center space-x-1">
          <Icon name="CheckCircle" size={14} />
          <span>{success}</span>
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;