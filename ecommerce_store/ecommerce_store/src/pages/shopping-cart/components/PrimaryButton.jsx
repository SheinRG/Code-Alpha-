import React from 'react';
import { Link } from 'react-router-dom';

const PrimaryButton = ({ 
  children, 
  to, 
  href, 
  onClick, 
  disabled = false, 
  loading = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center space-x-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary disabled:bg-gray-300 disabled:text-gray-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-text-primary focus:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-400',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary disabled:border-gray-300 disabled:text-gray-400',
    danger: 'bg-error hover:bg-red-700 text-white focus:ring-error disabled:bg-gray-300 disabled:text-gray-500',
    success: 'bg-success hover:bg-green-700 text-white focus:ring-success disabled:bg-gray-300 disabled:text-gray-500'
  };

  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = loading ? (
    <>
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      <span>Loading...</span>
    </>
  ) : children;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
};

export default PrimaryButton;