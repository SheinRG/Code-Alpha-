import React from 'react';


const PrimaryButton = ({
  children,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-text-primary focus:ring-gray-300',
    outline: 'border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-text-primary focus:ring-gray-300'
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {loading && (
        <div className="mr-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
        </div>
      )}
      {children}
    </button>
  );
};

export default PrimaryButton;