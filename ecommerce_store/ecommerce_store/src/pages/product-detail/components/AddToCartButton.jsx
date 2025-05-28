import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AddToCartButton = ({ 
  onAddToCart, 
  disabled = false, 
  quantity = 1,
  variant = 'primary',
  size = 'large'
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onAddToCart();
      setIsLoading(false);
    }, 800);
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-text-dark border border-border',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`
        w-full flex items-center justify-center space-x-2 font-medium rounded-lg
        transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
      `}
      aria-label={`Add ${quantity} item${quantity > 1 ? 's' : ''} to cart`}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Adding to Cart...</span>
        </>
      ) : (
        <>
          <Icon name="ShoppingCart" size={20} />
          <span>Add to Cart</span>
          {quantity > 1 && (
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
              {quantity}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default AddToCartButton;