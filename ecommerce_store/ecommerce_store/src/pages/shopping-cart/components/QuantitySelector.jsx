import React from 'react';
import Icon from '../../../components/AppIcon';

const QuantitySelector = ({ 
  quantity, 
  onQuantityChange, 
  disabled = false, 
  min = 1, 
  max = 99,
  size = 'medium'
}) => {
  const handleDecrease = () => {
    if (quantity > min && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max && !disabled) {
      onQuantityChange(value);
    }
  };

  const sizeClasses = {
    small: {
      container: 'h-8',
      button: 'w-8 h-8',
      input: 'w-12 h-8 text-sm',
      icon: 14
    },
    medium: {
      container: 'h-10',
      button: 'w-10 h-10',
      input: 'w-16 h-10 text-base',
      icon: 16
    },
    large: {
      container: 'h-12',
      button: 'w-12 h-12',
      input: 'w-20 h-12 text-lg',
      icon: 18
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-center">
      <label className="sr-only">Quantity</label>
      <div className={`flex items-center border border-gray-200 rounded-lg ${disabled ? 'opacity-50' : ''}`}>
        {/* Decrease Button */}
        <button
          type="button"
          onClick={handleDecrease}
          disabled={disabled || quantity <= min}
          className={`${currentSize.button} flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-gray-50 disabled:hover:bg-transparent disabled:hover:text-text-muted disabled:cursor-not-allowed transition-colors duration-150 rounded-l-lg border-r border-gray-200`}
          aria-label="Decrease quantity"
        >
          <Icon name="Minus" size={currentSize.icon} />
        </button>

        {/* Quantity Input */}
        <input
          type="number"
          min={min}
          max={max}
          value={quantity}
          onChange={handleInputChange}
          disabled={disabled}
          className={`${currentSize.input} text-center border-0 focus:outline-none focus:ring-0 disabled:bg-gray-50 disabled:cursor-not-allowed`}
          aria-label="Quantity"
        />

        {/* Increase Button */}
        <button
          type="button"
          onClick={handleIncrease}
          disabled={disabled || quantity >= max}
          className={`${currentSize.button} flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-gray-50 disabled:hover:bg-transparent disabled:hover:text-text-muted disabled:cursor-not-allowed transition-colors duration-150 rounded-r-lg border-l border-gray-200`}
          aria-label="Increase quantity"
        >
          <Icon name="Plus" size={currentSize.icon} />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;