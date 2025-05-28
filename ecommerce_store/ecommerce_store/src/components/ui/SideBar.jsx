import React, { useState } from 'react';
import Icon from '../AppIcon';

const SideBar = ({ variant = 'expanded', onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    brand: false,
    rating: false,
    features: false
  });

  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleFeatureChange = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRating(0);
    setSelectedFeatures([]);
    setPriceRange({ min: 0, max: 1000 });
  };

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 245 },
    { id: 'clothing', name: 'Clothing & Fashion', count: 189 },
    { id: 'home', name: 'Home & Garden', count: 156 },
    { id: 'sports', name: 'Sports & Outdoors', count: 98 },
    { id: 'books', name: 'Books & Media', count: 76 },
    { id: 'toys', name: 'Toys & Games', count: 54 }
  ];

  const brands = [
    { id: 'apple', name: 'Apple', count: 45 },
    { id: 'samsung', name: 'Samsung', count: 38 },
    { id: 'nike', name: 'Nike', count: 32 },
    { id: 'adidas', name: 'Adidas', count: 28 },
    { id: 'sony', name: 'Sony', count: 25 }
  ];

  const features = [
    { id: 'free-shipping', name: 'Free Shipping' },
    { id: 'on-sale', name: 'On Sale' },
    { id: 'new-arrivals', name: 'New Arrivals' },
    { id: 'eco-friendly', name: 'Eco-Friendly' },
    { id: 'bestseller', name: 'Bestseller' }
  ];

  const sidebarClasses = {
    expanded: 'w-80',
    collapsed: 'w-16',
    overlay: 'fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300'
  };

  const isCollapsed = variant === 'collapsed';
  const isOverlay = variant === 'overlay';

  return (
    <>
      {/* Overlay backdrop for mobile */}
      {isOverlay && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <aside className={`${sidebarClasses[variant]} bg-white border-r border-gray-200 h-full overflow-y-auto`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-lg font-heading font-semibold text-text-dark">Filters</h2>
            )}
            {isOverlay && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                aria-label="Close filters"
              >
                <Icon name="X" size={20} />
              </button>
            )}
            {!isCollapsed && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary hover:text-primary-dark transition-colors duration-150"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {isCollapsed ? (
          /* Collapsed View - Icons Only */
          <div className="p-2 space-y-4">
            <button className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150">
              <Icon name="Grid3X3" size={20} className="text-text-muted" />
            </button>
            <button className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150">
              <Icon name="DollarSign" size={20} className="text-text-muted" />
            </button>
            <button className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150">
              <Icon name="Tag" size={20} className="text-text-muted" />
            </button>
            <button className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150">
              <Icon name="Star" size={20} className="text-text-muted" />
            </button>
          </div>
        ) : (
          /* Expanded View */
          <div className="p-4 space-y-6">
            {/* Categories */}
            <div>
              <button
                onClick={() => toggleSection('categories')}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                <span className="font-medium text-text-dark">Categories</span>
                <Icon 
                  name={expandedSections.categories ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-muted"
                />
              </button>
              {expandedSections.categories && (
                <div className="mt-3 space-y-2">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="flex-1 text-sm text-text-primary">{category.name}</span>
                      <span className="text-xs text-text-muted">({category.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div>
              <button
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                <span className="font-medium text-text-dark">Price Range</span>
                <Icon 
                  name={expandedSections.price ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-muted"
                />
              </button>
              {expandedSections.price && (
                <div className="mt-3 space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <span className="text-text-muted">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 1000 }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Brands */}
            <div>
              <button
                onClick={() => toggleSection('brand')}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                <span className="font-medium text-text-dark">Brand</span>
                <Icon 
                  name={expandedSections.brand ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-muted"
                />
              </button>
              {expandedSections.brand && (
                <div className="mt-3 space-y-2">
                  {brands.map(brand => (
                    <label key={brand.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => handleBrandChange(brand.id)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="flex-1 text-sm text-text-primary">{brand.name}</span>
                      <span className="text-xs text-text-muted">({brand.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Rating */}
            <div>
              <button
                onClick={() => toggleSection('rating')}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                <span className="font-medium text-text-dark">Customer Rating</span>
                <Icon 
                  name={expandedSections.rating ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-muted"
                />
              </button>
              {expandedSections.rating && (
                <div className="mt-3 space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
                      />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < rating ? "text-warning fill-current" : "text-gray-300"}
                          />
                        ))}
                        <span className="text-sm text-text-primary ml-2">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Features */}
            <div>
              <button
                onClick={() => toggleSection('features')}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                <span className="font-medium text-text-dark">Features</span>
                <Icon 
                  name={expandedSections.features ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-muted"
                />
              </button>
              {expandedSections.features && (
                <div className="mt-3 space-y-2">
                  {features.map(feature => (
                    <label key={feature.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature.id)}
                        onChange={() => handleFeatureChange(feature.id)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm text-text-primary">{feature.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default SideBar;