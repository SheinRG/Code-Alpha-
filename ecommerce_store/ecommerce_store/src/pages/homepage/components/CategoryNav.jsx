import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryNav = ({ categories, activeCategory, onCategoryChange, isLoading }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Category Navigation */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-text-dark">
              Shop by Category
            </h2>
            
            {categories.length > 6 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm text-primary hover:text-primary-dark font-medium flex items-center space-x-1 transition-colors duration-150"
              >
                <span>{showAll ? 'Show Less' : 'View All'}</span>
                <Icon 
                  name={showAll ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3">
            {/* All Products */}
            <button
              onClick={() => onCategoryChange('all')}
              disabled={isLoading}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                activeCategory === 'all' ?'bg-primary text-white shadow-sm' :'bg-surface text-text-primary hover:bg-gray-200'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              All Products
            </button>

            {/* Category Pills */}
            {visibleCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface text-text-primary hover:bg-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Icon name={category.icon} size={16} />
                <span>{category.name}</span>
                <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center space-x-2 text-text-muted">
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span className="text-sm">Loading products...</span>
              </div>
            </div>
          )}

          {/* Filter Summary */}
          {activeCategory !== 'all' && !isLoading && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-text-muted">
                <Icon name="Filter" size={16} />
                <span>
                  Showing products in: 
                  <span className="font-medium text-text-primary ml-1">
                    {categories.find(cat => cat.id === activeCategory)?.name}
                  </span>
                </span>
              </div>
              
              <button
                onClick={() => onCategoryChange('all')}
                className="text-sm text-primary hover:text-primary-dark font-medium flex items-center space-x-1 transition-colors duration-150"
              >
                <Icon name="X" size={14} />
                <span>Clear Filter</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;