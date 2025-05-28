import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
            <Icon name="ShoppingBag" size={48} color="var(--color-primary)" />
          </div>
          <h1 className="text-6xl font-heading font-bold text-text-dark mb-4">404</h1>
          <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-muted mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/homepage"
            className="inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Icon name="Home" size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Link
              to="/homepage"
              className="text-primary hover:text-primary-dark transition-colors duration-150"
            >
              Browse Products
            </Link>
            <span className="text-subtle">•</span>
            <button
              onClick={() => window.history.back()}
              className="text-primary hover:text-primary-dark transition-colors duration-150"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;