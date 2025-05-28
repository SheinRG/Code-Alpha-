import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import FormField from './components/FormField';
import OrderSummary from './components/OrderSummary';
import ValidationMessage from './components/ValidationMessage';
import PrimaryButton from './components/PrimaryButton';
import Icon from '../../components/AppIcon';

const Checkout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Mock order data
  const orderItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop"
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address';
      case 'phone':
        return /^\+?[\d\s\-\(\)]{10,}$/.test(value) ? '' : 'Please enter a valid phone number';
      case 'firstName': case'lastName':
        return value.trim().length >= 2 ? '' : 'Name must be at least 2 characters';
      case 'address':
        return value.trim().length >= 5 ? '' : 'Please enter a complete address';
      case 'city':
        return value.trim().length >= 2 ? '' : 'Please enter a valid city';
      case 'state':
        return value.trim().length >= 2 ? '' : 'Please enter a valid state';
      case 'zipCode':
        return /^\d{5}(-\d{4})?$/.test(value) ? '' : 'Please enter a valid ZIP code';
      case 'cardNumber':
        return /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(value.replace(/\s/g, '')) ? '' : 'Please enter a valid card number';
      case 'expiryDate':
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? '' : 'Please enter MM/YY format';
      case 'cvv':
        return /^\d{3,4}$/.test(value) ? '' : 'Please enter a valid CVV';
      case 'cardName':
        return value.trim().length >= 2 ? '' : 'Please enter the name on card';
      default:
        return '';
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order number
      const orderNum = `ORD-${Date.now().toString().slice(-6)}`;
      setOrderNumber(orderNum);
      setOrderPlaced(true);
      
      // Scroll to top to show confirmation
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      setErrors({ submit: 'Payment processing failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-surface">
        <Header variant="compact" />
        <div className="pt-20 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-success bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={32} color="var(--color-success)" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-text-dark mb-4">
                Order Confirmed!
              </h1>
              <p className="text-text-muted mb-6">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
              <div className="bg-surface rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Order Number:</span>
                  <span className="font-medium text-text-dark">{orderNumber}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-text-muted">Estimated Delivery:</span>
                  <span className="font-medium text-text-dark">3-5 business days</span>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/homepage')}
                  className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary px-6 py-3 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer variant="simplified" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header variant="compact" />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-text-muted mb-4">
              <button 
                onClick={() => navigate('/shopping-cart')}
                className="hover:text-primary transition-colors duration-150"
              >
                Cart
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-text-primary font-medium">Checkout</span>
            </nav>
            <h1 className="text-3xl font-heading font-bold text-text-dark">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-heading font-semibold text-text-dark mb-6">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(value) => handleInputChange('email', value)}
                      onBlur={() => handleBlur('email')}
                      error={errors.email}
                      required
                      placeholder="john@example.com"
                    />
                    <FormField
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(value) => handleInputChange('phone', value)}
                      onBlur={() => handleBlur('phone')}
                      error={errors.phone}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-heading font-semibold text-text-dark mb-6">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="First Name"
                        type="text"
                        value={formData.firstName}
                        onChange={(value) => handleInputChange('firstName', value)}
                        onBlur={() => handleBlur('firstName')}
                        error={errors.firstName}
                        required
                        placeholder="John"
                      />
                      <FormField
                        label="Last Name"
                        type="text"
                        value={formData.lastName}
                        onChange={(value) => handleInputChange('lastName', value)}
                        onBlur={() => handleBlur('lastName')}
                        error={errors.lastName}
                        required
                        placeholder="Doe"
                      />
                    </div>
                    <FormField
                      label="Address"
                      type="text"
                      value={formData.address}
                      onChange={(value) => handleInputChange('address', value)}
                      onBlur={() => handleBlur('address')}
                      error={errors.address}
                      required
                      placeholder="123 Main Street"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        label="City"
                        type="text"
                        value={formData.city}
                        onChange={(value) => handleInputChange('city', value)}
                        onBlur={() => handleBlur('city')}
                        error={errors.city}
                        required
                        placeholder="New York"
                      />
                      <FormField
                        label="State"
                        type="text"
                        value={formData.state}
                        onChange={(value) => handleInputChange('state', value)}
                        onBlur={() => handleBlur('state')}
                        error={errors.state}
                        required
                        placeholder="NY"
                      />
                      <FormField
                        label="ZIP Code"
                        type="text"
                        value={formData.zipCode}
                        onChange={(value) => handleInputChange('zipCode', value)}
                        onBlur={() => handleBlur('zipCode')}
                        error={errors.zipCode}
                        required
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-heading font-semibold text-text-dark mb-6">
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <FormField
                      label="Card Number"
                      type="text"
                      value={formData.cardNumber}
                      onChange={(value) => handleInputChange('cardNumber', value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim())}
                      onBlur={() => handleBlur('cardNumber')}
                      error={errors.cardNumber}
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        label="Expiry Date"
                        type="text"
                        value={formData.expiryDate}
                        onChange={(value) => {
                          let formatted = value.replace(/\D/g, '');
                          if (formatted.length >= 2) {
                            formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 4);
                          }
                          handleInputChange('expiryDate', formatted);
                        }}
                        onBlur={() => handleBlur('expiryDate')}
                        error={errors.expiryDate}
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      <FormField
                        label="CVV"
                        type="text"
                        value={formData.cvv}
                        onChange={(value) => handleInputChange('cvv', value.replace(/\D/g, ''))}
                        onBlur={() => handleBlur('cvv')}
                        error={errors.cvv}
                        required
                        placeholder="123"
                        maxLength={4}
                      />
                      <FormField
                        label="Name on Card"
                        type="text"
                        value={formData.cardName}
                        onChange={(value) => handleInputChange('cardName', value)}
                        onBlur={() => handleBlur('cardName')}
                        error={errors.cardName}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {errors.submit && (
                    <ValidationMessage message={errors.submit} type="error" className="mb-4" />
                  )}
                  <PrimaryButton
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                  </PrimaryButton>
                  <p className="text-xs text-text-muted text-center mt-3">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Mobile Toggle */}
                <div className="lg:hidden mb-4">
                  <button
                    onClick={() => setShowOrderSummary(!showOrderSummary)}
                    className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <span className="font-medium text-text-dark">
                      Order Summary ({orderItems.length} items)
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-text-dark">${total.toFixed(2)}</span>
                      <Icon 
                        name={showOrderSummary ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        className="text-text-muted"
                      />
                    </div>
                  </button>
                </div>

                {/* Order Summary Content */}
                <div className={`${showOrderSummary ? 'block' : 'hidden'} lg:block`}>
                  <OrderSummary
                    items={orderItems}
                    subtotal={subtotal}
                    shipping={shipping}
                    tax={tax}
                    total={total}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;