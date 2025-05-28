import React from 'react';
import Icon from '../../../components/AppIcon';

const QuantitySelector = ({ 
  quantity = 1, 
  onQuantityChange, 
  min = 1, 
  max = 99, 
  disabled = false 
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
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, value));
    onQuantityChange(clampedValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrease();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrease();
    }
  };

  return (
    <div className="flex items-center border border-border rounded-lg overflow-hidden">
      <button
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className="w-10 h-10 flex items-center justify-center bg-surface hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        aria-label="Decrease quantity"
      >
        <Icon name="Minus" size={16} className="text-text-primary" />
      </button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        min={min}
        max={max}
        className="w-16 h-10 text-center border-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Quantity"
      />
      
      <button
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className="w-10 h-10 flex items-center justify-center bg-surface hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        aria-label="Increase quantity"
      >
        <Icon name="Plus" size={16} className="text-text-primary" />
      </button>
    </div>
  );
};

export default QuantitySelector;