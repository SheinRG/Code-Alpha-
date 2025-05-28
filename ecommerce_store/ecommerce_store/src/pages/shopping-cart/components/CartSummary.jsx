import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CartSummary = ({ subtotal, shipping, total, itemCount }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    setPromoError('');

    // Simulate promo code validation
    setTimeout(() => {
      const validPromoCodes = ['SAVE10', 'WELCOME20', 'FREESHIP'];
      
      if (validPromoCodes.includes(promoCode.toUpperCase())) {
        setPromoApplied(true);
        setPromoError('');
      } else {
        setPromoError('Invalid promo code. Please try again.');
        setPromoApplied(false);
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const removePromo = () => {
    setPromoCode('');
    setPromoApplied(false);
    setPromoError('');
  };

  const promoDiscount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const finalTotal = total - promoDiscount;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-heading font-semibold text-text-dark mb-6">
        Order Summary
      </h2>

      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-text-muted">Subtotal ({itemCount} item{itemCount > 1 ? 's' : ''})</span>
          <span className="font-medium text-text-dark">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-text-muted">Shipping</span>
            {shipping === 0 && (
              <span className="text-xs bg-success text-white px-2 py-1 rounded-full">FREE</span>
            )}
          </div>
          <span className="font-medium text-text-dark">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {shipping > 0 && (
          <div className="text-sm text-text-muted bg-blue-50 p-3 rounded-lg">
            <Icon name="Info" size={16} className="inline mr-2 text-info" />
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}

        {promoApplied && (
          <div className="flex items-center justify-between text-success">
            <div className="flex items-center space-x-2">
              <span>Promo Code ({promoCode.toUpperCase()})</span>
              <button
                onClick={removePromo}
                className="text-text-muted hover:text-error transition-colors duration-150"
                aria-label="Remove promo code"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
            <span className="font-medium">-${promoDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-text-dark">Total</span>
            <span className="text-xl font-bold text-text-dark">${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Promo Code Section */}
      {!promoApplied && (
        <div className="mb-6">
          <form onSubmit={handlePromoSubmit} className="space-y-3">
            <div>
              <label htmlFor="promoCode" className="block text-sm font-medium text-text-primary mb-2">
                Promo Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="promoCode"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150"
                />
                <button
                  type="submit"
                  disabled={!promoCode.trim() || isApplyingPromo}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-text-muted text-text-primary rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:cursor-not-allowed"
                >
                  {isApplyingPromo ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-text-primary"></div>
                  ) : (
                    'Apply'
                  )}
                </button>
              </div>
            </div>
            {promoError && (
              <p className="text-sm text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={14} />
                <span>{promoError}</span>
              </p>
            )}
          </form>
        </div>
      )}

      {/* Estimated Delivery */}
      <div className="bg-surface p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Truck" size={20} className="text-primary" />
          <div>
            <p className="text-sm font-medium text-text-dark">Estimated Delivery</p>
            <p className="text-sm text-text-muted">3-5 business days</p>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-text-muted">
          <Icon name="Shield" size={16} className="text-success" />
          <span>SSL encrypted checkout</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-muted">
          <Icon name="RotateCcw" size={16} className="text-info" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-muted">
          <Icon name="Award" size={16} className="text-warning" />
          <span>1-year warranty included</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;