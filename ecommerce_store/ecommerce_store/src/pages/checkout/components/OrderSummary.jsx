import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ items, subtotal, shipping, tax, total }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-heading font-semibold text-text-dark mb-6">
        Order Summary
      </h2>
      
      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-16 h-16 bg-surface rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-text-dark truncate">
                {item.name}
              </h3>
              <p className="text-sm text-text-muted">
                ${item.price.toFixed(2)} each
              </p>
            </div>
            <div className="text-sm font-medium text-text-dark">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Promo code"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-text-primary rounded-lg text-sm font-medium transition-colors duration-150">
            Apply
          </button>
        </div>
      </div>

      {/* Order Totals */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Subtotal</span>
          <span className="text-text-dark">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Shipping</span>
          <span className="text-text-dark">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Tax</span>
          <span className="text-text-dark">${tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold pt-3 border-t border-gray-200">
          <span className="text-text-dark">Total</span>
          <span className="text-text-dark">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-sm text-text-muted">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;