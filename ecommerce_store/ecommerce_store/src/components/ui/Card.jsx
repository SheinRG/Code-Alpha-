import React from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const Card = ({ 
  variant = 'product', 
  data = {},
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]';

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(data);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (onAddToWishlist) onAddToWishlist(data);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(data);
  };

  const handleCardClick = () => {
    if (onClick) onClick(data);
  };

  if (variant === 'product') {
    const { 
      id, 
      image, 
      title, 
      price, 
      originalPrice, 
      discount, 
      rating = 0, 
      reviewCount = 0, 
      isOnSale = false,
      isNew = false,
      isFreeShipping = false,
      isInWishlist = false,
      isOutOfStock = false
    } = data;

    return (
      <div 
        className={`${baseClasses} ${className} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
        {...props}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {isOnSale && (
              <span className="bg-sale text-white text-xs font-medium px-2 py-1 rounded">
                -{discount}%
              </span>
            )}
            {isNew && (
              <span className="bg-info text-white text-xs font-medium px-2 py-1 rounded">
                New
              </span>
            )}
            {isFreeShipping && (
              <span className="bg-success text-white text-xs font-medium px-2 py-1 rounded">
                Free Ship
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleAddToWishlist}
              className={`p-2 rounded-full shadow-md transition-colors duration-150 ${
                isInWishlist 
                  ? 'bg-primary text-white' :'bg-white text-gray-600 hover:text-primary'
              }`}
              aria-label="Add to wishlist"
            >
              <Icon name="Heart" size={16} className={isInWishlist ? 'fill-current' : ''} />
            </button>
            <button
              onClick={handleQuickView}
              className="p-2 bg-white text-gray-600 hover:text-primary rounded-full shadow-md transition-colors duration-150"
              aria-label="Quick view"
            >
              <Icon name="Eye" size={16} />
            </button>
          </div>
          
          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-medium text-text-dark mb-2 line-clamp-2">
            {title}
          </h3>
          
          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center space-x-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    className={i < Math.floor(rating) ? "text-warning fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-text-muted">({reviewCount})</span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-accent font-medium text-text-dark">
              ${price}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-text-muted line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <Button
            variant="primary"
            size="small"
            fullWidth
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            icon="ShoppingCart"
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    const { image, title, subtitle, description, buttonText, buttonAction } = data;

    return (
      <div className={`${baseClasses} ${className} group`} {...props}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl font-heading font-bold mb-1">{title}</h3>
            {subtitle && <p className="text-sm opacity-90 mb-2">{subtitle}</p>}
            {description && <p className="text-sm opacity-80 mb-3">{description}</p>}
            {buttonText && (
              <Button
                variant="primary"
                size="small"
                onClick={buttonAction}
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'collection') {
    const { image, title, itemCount, href } = data;

    return (
      <div className={`${baseClasses} ${className} group cursor-pointer`} onClick={handleCardClick} {...props}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-xl font-heading font-bold mb-1">{title}</h3>
              <p className="text-sm opacity-90">{itemCount} items</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'review') {
    const { avatar, name, rating, date, comment, verified = false } = data;

    return (
      <div className={`${baseClasses} ${className}`} {...props}>
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <Image
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-text-dark">{name}</h4>
                {verified && (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                )}
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < rating ? "text-warning fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-muted">{date}</span>
              </div>
              <p className="text-sm text-text-primary leading-relaxed">{comment}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Card;