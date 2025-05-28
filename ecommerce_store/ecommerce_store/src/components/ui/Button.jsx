import React from 'react';
import Icon from '../AppIcon';

const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    icon: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    link: 'text-primary hover:text-primary-dark underline-offset-4 hover:underline focus:ring-primary',
    success: 'bg-success text-white hover:bg-green-700 focus:ring-success',
    warning: 'bg-warning text-white hover:bg-amber-600 focus:ring-warning',
    error: 'bg-error text-white hover:bg-red-700 focus:ring-error'
  };

  const sizeClasses = {
    small: variant === 'icon' ? 'p-1.5' : 'px-3 py-1.5 text-sm',
    medium: variant === 'icon' ? 'p-2' : 'px-4 py-2 text-base',
    large: variant === 'icon' ? 'p-3' : 'px-6 py-3 text-lg'
  };

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const iconSize = iconSizes[size];
  const showIcon = icon && !loading;
  const showText = variant !== 'icon' && children;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Icon 
          name="Loader2" 
          size={iconSize} 
          className={`animate-spin ${showText ? 'mr-2' : ''}`}
        />
      )}
      
      {showIcon && iconPosition === 'left' && (
        <Icon 
          name={icon} 
          size={iconSize} 
          className={showText ? 'mr-2' : ''}
        />
      )}
      
      {showText && children}
      
      {showIcon && iconPosition === 'right' && (
        <Icon 
          name={icon} 
          size={iconSize} 
          className={showText ? 'ml-2' : ''}
        />
      )}
    </button>
  );
};

export default Button;