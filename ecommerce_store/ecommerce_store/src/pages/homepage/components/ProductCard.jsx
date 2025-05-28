import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProductCard = ({ product, onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onAddToCart(product);
    setIsLoading(false);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <Link to="/product-detail" className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-surface">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.isNew && (
              <span className="bg-success text-white text-xs font-medium px-2 py-1 rounded-full">
                New
              </span>
            )}
            {product.discount && (
              <span className="bg-sale text-white text-xs font-medium px-2 py-1 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Icon 
              name="Heart" 
              size={16} 
              className={isWishlisted ? "text-sale fill-current" : "text-text-muted"} 
            />
          </button>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button className="bg-white text-text-dark px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Quick View
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-text-muted uppercase tracking-wide font-medium mb-1">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-sm font-medium text-text-dark mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-150">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={12}
                  className={i < Math.floor(product.rating) ? "text-warning fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg font-semibold text-text-dark">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-text-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !product.inStock}
          className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Adding...</span>
            </>
          ) : !product.inStock ? (
            <span>Out of Stock</span>
          ) : (
            <>
              <Icon name="ShoppingCart" size={16} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;