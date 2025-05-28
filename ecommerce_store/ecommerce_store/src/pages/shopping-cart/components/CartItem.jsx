import React from 'react';
import { Link } from 'react-router-dom';
import QuantitySelector from './QuantitySelector';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemove, 
  showDeleteConfirm, 
  onConfirmDelete, 
  onCancelDelete,
  isLoading 
}) => {
  const itemSubtotal = item.price * item.quantity;

  return (
    <div className="p-6 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-text-dark mb-1">
                <Link 
                  to={`/product-detail/${item.id}`}
                  className="hover:text-primary transition-colors duration-150"
                >
                  {item.name}
                </Link>
              </h3>
              
              <div className="flex items-center space-x-4 text-sm text-text-muted mb-3">
                {item.color && (
                  <span>Color: {item.color}</span>
                )}
                {item.size && (
                  <span>Size: {item.size}</span>
                )}
              </div>

              {!item.inStock && (
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="AlertCircle" size={16} className="text-warning" />
                  <span className="text-sm text-warning font-medium">Out of Stock</span>
                </div>
              )}

              <div className="flex items-center space-x-6">
                {/* Quantity Selector */}
                <QuantitySelector
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity) => onUpdateQuantity(item.id, newQuantity)}
                  disabled={!item.inStock || isLoading}
                  min={1}
                  max={10}
                />

                {/* Remove Button */}
                <div className="relative">
                  <button
                    onClick={() => onRemove(item.id)}
                    className="flex items-center space-x-1 text-sm text-text-muted hover:text-error transition-colors duration-150"
                    disabled={isLoading}
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Remove</span>
                  </button>

                  {/* Delete Confirmation Tooltip */}
                  {showDeleteConfirm && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20 w-64">
                      <p className="text-sm text-text-primary mb-3">
                        Are you sure you want to remove this item from your cart?
                      </p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={onConfirmDelete}
                          className="bg-error hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-150"
                        >
                          Remove
                        </button>
                        <button
                          onClick={onCancelDelete}
                          className="bg-gray-100 hover:bg-gray-200 text-text-primary px-3 py-1 rounded text-sm font-medium transition-colors duration-150"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Save for Later */}
                <button className="flex items-center space-x-1 text-sm text-text-muted hover:text-primary transition-colors duration-150">
                  <Icon name="Heart" size={16} />
                  <span>Save for Later</span>
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-right ml-4">
              <p className="text-lg font-semibold text-text-dark">
                ${itemSubtotal.toFixed(2)}
              </p>
              {item.quantity > 1 && (
                <p className="text-sm text-text-muted">
                  ${item.price.toFixed(2)} each
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;