import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = ({ variant = 'full' }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  if (variant === 'simplified') {
    return (
      <footer className="bg-text-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-bold">ShopHub</span>
            </div>

            {/* Quick Links */}
            <nav className="flex items-center space-x-6">
              <Link to="/homepage" className="text-gray-300 hover:text-white transition-colors duration-150">
                Home
              </Link>
              <Link to="/product-detail" className="text-gray-300 hover:text-white transition-colors duration-150">
                Products
              </Link>
              <Link to="/shopping-cart" className="text-gray-300 hover:text-white transition-colors duration-150">
                Cart
              </Link>
            </nav>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">
                <Icon name="Instagram" size={20} />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 ShopHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-text-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-bold">ShopHub</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted online shopping destination for quality products at unbeatable prices. 
              Discover amazing deals and fast shipping on everything you need.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-150"
                aria-label="Facebook"
              >
                <Icon name="Facebook" size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-150"
                aria-label="Twitter"
              >
                <Icon name="Twitter" size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-150"
                aria-label="Instagram"
              >
                <Icon name="Instagram" size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-150"
                aria-label="YouTube"
              >
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <Link 
                to="/homepage" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                Home
              </Link>
              <Link 
                to="/product-detail" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                Products
              </Link>
              <Link 
                to="/shopping-cart" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                Shopping Cart
              </Link>
              <Link 
                to="/checkout" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                Checkout
              </Link>
              <a 
                href="#" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                About Us
              </a>
              <a 
                href="#" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Customer Service</h3>
            <nav className="space-y-2">
              <a 
                href="#" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                Help Center
              </a>
              <a 
                href="#" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                Shipping Info
              </a>
              <a 
                href="#" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                Returns & Exchanges
              </a>
              <a 
                href="#" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                Size Guide
              </a>
              <a 
                href="#" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                Track Your Order
              </a>
              <a 
                href="#" 
                className="block text-gray-300 hover:text-white transition-colors duration-150"
              >
                FAQ
              </a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for exclusive deals and new product announcements.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <p className="text-success text-sm flex items-center space-x-1">
                <Icon name="CheckCircle" size={16} />
                <span>Successfully subscribed!</span>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 ShopHub. All rights reserved.
            </p>
            
            {/* Legal Links */}
            <nav className="flex items-center space-x-6">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-150"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-150"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-150"
              >
                Cookie Policy
              </a>
            </nav>

            {/* Payment Methods */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex items-center space-x-2">
                <Icon name="CreditCard" size={20} className="text-gray-400" />
                <span className="text-gray-400 text-xs">Visa</span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-gray-400 text-xs">Mastercard</span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-gray-400 text-xs">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;