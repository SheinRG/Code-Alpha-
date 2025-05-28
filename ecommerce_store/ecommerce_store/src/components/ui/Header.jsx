import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = ({ variant = 'default' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const headerClasses = {
    default: 'bg-white shadow-sm border-b border-gray-200',
    transparent: 'bg-transparent',
    compact: 'bg-white shadow-sm border-b border-gray-200 py-2'
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${headerClasses[variant]} transition-all duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/homepage" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-bold text-text-dark">ShopHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/homepage" 
              className="text-text-primary hover:text-primary transition-colors duration-150 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/product-detail" 
              className="text-text-primary hover:text-primary transition-colors duration-150 font-medium"
            >
              Products
            </Link>
            <div className="relative group">
              <button className="text-text-primary hover:text-primary transition-colors duration-150 font-medium flex items-center space-x-1">
                <span>Categories</span>
                <Icon name="ChevronDown" size={16} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-primary transition-colors duration-150">Electronics</a>
                  <a href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-primary transition-colors duration-150">Clothing</a>
                  <a href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-primary transition-colors duration-150">Home & Garden</a>
                  <a href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-primary transition-colors duration-150">Sports</a>
                </div>
              </div>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150"
              />
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 text-text-primary hover:text-primary transition-colors duration-150"
              aria-label="Toggle search"
            >
              <Icon name="Search" size={20} />
            </button>

            {/* User Account */}
            <button className="hidden sm:flex p-2 text-text-primary hover:text-primary transition-colors duration-150">
              <Icon name="User" size={20} />
            </button>

            {/* Wishlist */}
            <button className="hidden sm:flex p-2 text-text-primary hover:text-primary transition-colors duration-150 relative">
              <Icon name="Heart" size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>

            {/* Shopping Cart */}
            <Link 
              to="/shopping-cart" 
              className="p-2 text-text-primary hover:text-primary transition-colors duration-150 relative"
            >
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-primary hover:text-primary transition-colors duration-150"
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150"
              />
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle"
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/homepage" 
                className="text-text-primary hover:text-primary transition-colors duration-150 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/product-detail" 
                className="text-text-primary hover:text-primary transition-colors duration-150 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <button className="text-left text-text-primary hover:text-primary transition-colors duration-150 font-medium">
                Categories
              </button>
              <div className="pl-4 space-y-2">
                <a href="#" className="block text-sm text-text-muted hover:text-primary transition-colors duration-150">Electronics</a>
                <a href="#" className="block text-sm text-text-muted hover:text-primary transition-colors duration-150">Clothing</a>
                <a href="#" className="block text-sm text-text-muted hover:text-primary transition-colors duration-150">Home & Garden</a>
                <a href="#" className="block text-sm text-text-muted hover:text-primary transition-colors duration-150">Sports</a>
              </div>
              <Link 
                to="/shopping-cart" 
                className="text-text-primary hover:text-primary transition-colors duration-150 font-medium flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name="ShoppingCart" size={20} />
                <span>Cart (2)</span>
              </Link>
              <button className="text-left text-text-primary hover:text-primary transition-colors duration-150 font-medium flex items-center space-x-2">
                <Icon name="User" size={20} />
                <span>Account</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;