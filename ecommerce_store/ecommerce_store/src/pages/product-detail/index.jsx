import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Breadcrumb from './components/Breadcrumb';
import ImageGallery from './components/ImageGallery';
import QuantitySelector from './components/QuantitySelector';
import AddToCartButton from './components/AddToCartButton';
import Icon from '../../components/AppIcon';

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showToast, setShowToast] = useState(false);

  // Mock product data
  const productData = {
    id: 1,
    name: "Premium Wireless Bluetooth Headphones",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    sku: "WH-1000XM5-B",
    rating: 4.8,
    reviewCount: 2847,
    inStock: true,
    stockCount: 15,
    shortDescription: "Experience superior sound quality with industry-leading noise cancellation technology. Perfect for music lovers and professionals who demand the best audio experience.",
    description: `Immerse yourself in exceptional sound quality with these premium wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear audio whether you're listening to music, taking calls, or focusing on work.

Key Features:
• Industry-leading noise cancellation technology
• 30-hour battery life with quick charge capability
• Premium comfort with soft ear cushions
• Touch sensor controls for easy operation
• Speak-to-chat technology automatically reduces volume
• Multipoint connection for seamless device switching
• High-resolution audio support
• Foldable design for easy portability

Perfect for commuting, working from home, or enjoying your favorite music, these headphones combine cutting-edge technology with premium comfort for an unmatched listening experience.`,
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "4Hz-40kHz",
      "Battery Life": "30 hours",
      "Charging Time": "3 hours",
      "Weight": "254g",
      "Connectivity": "Bluetooth 5.2, USB-C",
      "Noise Cancellation": "Yes, Adaptive",
      "Voice Assistant": "Google Assistant, Alexa"
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&h=600&fit=crop"
    ],
    category: "Electronics",
    brand: "AudioTech",
    tags: ["wireless", "bluetooth", "noise-cancelling", "premium"]
  };

  const breadcrumbItems = [
    { label: "Home", href: "/homepage" },
    { label: "Electronics", href: "#" },
    { label: "Headphones", href: "#" },
    { label: productData.name, href: "#", current: true }
  ];

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, Math.min(newQuantity, productData.stockCount)));
  };

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-error bg-opacity-10 rounded-full flex items-center justify-center">
        <Icon name="AlertTriangle" size={48} color="var(--color-error)" />
      </div>
      <h2 className="text-2xl font-heading font-semibold text-text-dark mb-4">Product Unavailable</h2>
      <p className="text-text-muted mb-8 max-w-md mx-auto">
        Sorry, this product is currently unavailable or doesn't exist. Please try again later or browse our other products.
      </p>
      <Link
        to="/homepage"
        className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <Icon name="ArrowLeft" size={20} />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );

  if (hasError) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ErrorState />
          </div>
        </main>
        <Footer variant="simplified" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-success text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-down">
          <Icon name="CheckCircle" size={20} />
          <span className="font-medium">Added to cart successfully!</span>
        </div>
      )}

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {/* Product Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                {/* Image Gallery */}
                <div className="order-1">
                  <ImageGallery images={productData.images} productName={productData.name} />
                </div>

                {/* Product Information */}
                <div className="order-2 space-y-6">
                  {/* Product Title & Rating */}
                  <div>
                    <h1 className="text-3xl font-heading font-bold text-text-dark mb-2">
                      {productData.name}
                    </h1>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={i < Math.floor(productData.rating) ? "text-warning fill-current" : "text-gray-300"}
                          />
                        ))}
                        <span className="text-sm text-text-muted ml-2">
                          {productData.rating} ({productData.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    <p className="text-text-muted text-sm">SKU: {productData.sku}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-text-dark">${productData.price}</span>
                    {productData.originalPrice && (
                      <>
                        <span className="text-xl text-text-muted line-through">${productData.originalPrice}</span>
                        <span className="bg-sale text-white px-2 py-1 rounded text-sm font-medium">
                          {productData.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Short Description */}
                  <p className="text-text-primary leading-relaxed">
                    {productData.shortDescription}
                  </p>

                  {/* Stock Status */}
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={productData.inStock ? "CheckCircle" : "XCircle"} 
                      size={20} 
                      className={productData.inStock ? "text-success" : "text-error"}
                    />
                    <span className={`font-medium ${productData.inStock ? "text-success" : "text-error"}`}>
                      {productData.inStock ? `In Stock (${productData.stockCount} available)` : "Out of Stock"}
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-text-primary">Quantity:</label>
                      <QuantitySelector
                        quantity={quantity}
                        onQuantityChange={handleQuantityChange}
                        max={productData.stockCount}
                        disabled={!productData.inStock}
                      />
                    </div>

                    {/* Add to Cart Button */}
                    <AddToCartButton
                      onAddToCart={handleAddToCart}
                      disabled={!productData.inStock}
                      quantity={quantity}
                    />
                  </div>

                  {/* Additional Actions */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-border">
                    <button className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors duration-150">
                      <Icon name="Heart" size={20} />
                      <span>Add to Wishlist</span>
                    </button>
                    <button className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors duration-150">
                      <Icon name="Share2" size={20} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Details Tabs */}
              <div className="border-t border-border pt-8">
                <div className="flex space-x-8 border-b border-border">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                      activeTab === 'description' ?'border-primary text-primary' :'border-transparent text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('specifications')}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                      activeTab === 'specifications'
                        ? 'border-primary text-primary' :'border-transparent text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                      activeTab === 'reviews' ?'border-primary text-primary' :'border-transparent text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Reviews ({productData.reviewCount})
                  </button>
                </div>

                <div className="py-8">
                  {activeTab === 'description' && (
                    <div className="prose prose-lg max-w-none text-text-primary">
                      <p className="whitespace-pre-line">{productData.description}</p>
                    </div>
                  )}

                  {activeTab === 'specifications' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(productData.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-3 border-b border-border">
                          <span className="font-medium text-text-primary">{key}:</span>
                          <span className="text-text-muted">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="text-center py-12">
                      <Icon name="MessageSquare" size={48} className="mx-auto text-subtle mb-4" />
                      <h3 className="text-lg font-medium text-text-primary mb-2">No reviews yet</h3>
                      <p className="text-text-muted">Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;