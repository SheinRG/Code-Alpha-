import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import CartItem from './components/CartItem';

import CartSummary from './components/CartSummary';
import PrimaryButton from './components/PrimaryButton';
import Icon from '../../components/AppIcon';


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      color: "Black",
      size: "One Size",
      inStock: true
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt",
      price: 24.99,
      quantity: 2,
      image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?w=300&h=300&fit=crop",
      color: "Navy Blue",
      size: "Medium",
      inStock: true
    },
    {
      id: 3,
      name: "Smartphone Case with Stand",
      price: 15.99,
      quantity: 1,
      image: "https://images.pixabay.com/photo/2017/08/12/10/16/smartphone-2634991_1280.jpg?w=300&h=300&fit=crop",
      color: "Clear",
      size: "iPhone 14",
      inStock: false
    }
  ];

  useEffect(() => {
    // Simulate loading cart from localStorage
    setIsLoading(true);
    setTimeout(() => {
      const savedCart = localStorage.getItem('shophub_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems(mockCartItems);
        localStorage.setItem('shophub_cart', JSON.stringify(mockCartItems));
      }
      setIsLoading(false);
    }, 500);
  }, []);

  const updateCartInStorage = (updatedItems) => {
    localStorage.setItem('shophub_cart', JSON.stringify(updatedItems));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const updatedItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      updateCartInStorage(updatedItems);
      setIsLoading(false);
    }, 300);
  };

  const removeItem = (itemId) => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      updateCartInStorage(updatedItems);
      setShowDeleteConfirm(null);
      setIsLoading(false);
    }, 300);
  };

  const handleDeleteClick = (itemId) => {
    setShowDeleteConfirm(itemId);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (isLoading && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-text-muted">Loading your cart...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-text-muted mb-4">
              <Link to="/homepage" className="hover:text-primary transition-colors duration-150">
                Home
              </Link>
              <Icon name="ChevronRight" size={16} />
              <span className="text-text-primary font-medium">Shopping Cart</span>
            </nav>
            <h1 className="text-3xl font-heading font-bold text-text-dark">Shopping Cart</h1>
            <p className="text-text-muted mt-2">
              {cartItems.length === 0 ? 'Your cart is empty' : `${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`}
            </p>
          </div>

          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon name="ShoppingCart" size={48} className="text-subtle" />
              </div>
              <h2 className="text-2xl font-heading font-semibold text-text-dark mb-4">
                Your cart is empty
              </h2>
              <p className="text-text-muted mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <Link
                to="/homepage"
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Icon name="ArrowLeft" size={20} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          ) : (
            /* Cart Content */
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-heading font-semibold text-text-dark">
                      Cart Items ({cartItems.length})
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={handleDeleteClick}
                        showDeleteConfirm={showDeleteConfirm === item.id}
                        onConfirmDelete={() => removeItem(item.id)}
                        onCancelDelete={() => setShowDeleteConfirm(null)}
                        isLoading={isLoading}
                      />
                    ))}
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link
                    to="/homepage"
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark font-medium transition-colors duration-150"
                  >
                    <Icon name="ArrowLeft" size={20} />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  itemCount={cartItems.length}
                />
                
                <div className="mt-6 space-y-4">
                  <PrimaryButton
                    to="/checkout"
                    className="w-full"
                    size="large"
                  >
                    <Icon name="CreditCard" size={20} />
                    <span>Proceed to Checkout</span>
                  </PrimaryButton>
                  
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-text-primary px-6 py-3 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                    Save for Later
                  </button>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Icon name="Shield" size={20} className="text-success" />
                    <div>
                      <p className="text-sm font-medium text-success">Secure Checkout</p>
                      <p className="text-xs text-green-600">Your payment information is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShoppingCart;