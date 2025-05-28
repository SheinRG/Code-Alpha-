import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ProductCard from './components/ProductCard';
import CategoryNav from './components/CategoryNav';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [cartItems, setCartItems] = useState([]);

  // Mock data
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      discount: 20,
      inStock: true,
      isWishlisted: false
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt",
      category: "Clothing",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.2,
      reviewCount: 89,
      isNew: false,
      inStock: true,
      isWishlisted: true
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      category: "Electronics",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 256,
      isNew: true,
      discount: 20,
      inStock: true,
      isWishlisted: false
    },
    {
      id: 4,
      name: "Ceramic Plant Pot Set",
      category: "Home & Garden",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
      rating: 4.3,
      reviewCount: 67,
      isNew: false,
      inStock: true,
      isWishlisted: false
    },
    {
      id: 5,
      name: "Professional Basketball",
      category: "Sports",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 143,
      isNew: false,
      inStock: false,
      isWishlisted: false
    },
    {
      id: 6,
      name: "Leather Crossbody Bag",
      category: "Clothing",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.4,
      reviewCount: 92,
      isNew: false,
      discount: 25,
      inStock: true,
      isWishlisted: true
    },
    {
      id: 7,
      name: "Wireless Charging Pad",
      category: "Electronics",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      rating: 4.1,
      reviewCount: 78,
      isNew: true,
      inStock: true,
      isWishlisted: false
    },
    {
      id: 8,
      name: "Succulent Garden Kit",
      category: "Home & Garden",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 134,
      isNew: false,
      inStock: true,
      isWishlisted: false
    },
    {
      id: 9,
      name: "Running Shoes",
      category: "Sports",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 312,
      isNew: true,
      discount: 19,
      inStock: true,
      isWishlisted: false
    },
    {
      id: 10,
      name: "Vintage Denim Jacket",
      category: "Clothing",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      rating: 4.3,
      reviewCount: 156,
      isNew: false,
      inStock: true,
      isWishlisted: false
    },
    {
      id: 11,
      name: "Smart Home Speaker",
      category: "Electronics",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 203,
      isNew: true,
      inStock: true,
      isWishlisted: false
    },
    {
      id: 12,
      name: "Yoga Mat Premium",
      category: "Sports",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 189,
      isNew: false,
      inStock: true,
      isWishlisted: true
    }
  ];

  const mockCategories = [
    { id: 'electronics', name: 'Electronics', icon: 'Smartphone', count: 5 },
    { id: 'clothing', name: 'Clothing', icon: 'Shirt', count: 3 },
    { id: 'home-garden', name: 'Home & Garden', icon: 'Home', count: 2 },
    { id: 'sports', name: 'Sports', icon: 'Dumbbell', count: 3 },
    { id: 'books', name: 'Books', icon: 'Book', count: 0 },
    { id: 'beauty', name: 'Beauty', icon: 'Sparkles', count: 0 },
    { id: 'toys', name: 'Toys', icon: 'Gamepad2', count: 0 }
  ];

  const featuredProducts = [
    {
      id: 'featured-1',
      name: "Premium Wireless Headphones",
      description: "Experience crystal-clear audio with our latest noise-canceling technology",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
      discount: 33
    },
    {
      id: 'featured-2',
      name: "Smart Fitness Tracker",
      description: "Track your health and fitness goals with advanced monitoring features",
      price: 149.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=600&fit=crop",
      discount: 25
    }
  ];

  // Initialize data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setCategories(mockCategories);
      setIsLoading(false);
    };

    loadInitialData();
  }, []);

  // Handle category change
  const handleCategoryChange = async (categoryId) => {
    setIsLoading(true);
    setActiveCategory(categoryId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (categoryId === 'all') {
      setFilteredProducts(products);
    } else {
      const categoryName = categories.find(cat => cat.id === categoryId)?.name;
      const filtered = products.filter(product => 
        product.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === categoryId ||
        product.category === categoryName
      );
      setFilteredProducts(filtered);
    }
    
    setDisplayedProducts(8);
    setIsLoading(false);
  };

  // Handle load more products
  const handleLoadMore = async () => {
    setLoadingMore(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setDisplayedProducts(prev => prev + 8);
    setLoadingMore(false);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const currentProducts = filteredProducts.slice(0, displayedProducts);
  const hasMoreProducts = displayedProducts < filteredProducts.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Discover Amazing Products at Unbeatable Prices
              </h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Shop from thousands of quality products with fast shipping and excellent customer service. Your satisfaction is our priority.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/product-detail"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                >
                  <span>Shop Now</span>
                  <Icon name="ArrowRight" size={20} />
                </Link>
                <button className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                  <Icon name="Play" size={20} />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Featured Products Carousel */}
            <div className="space-y-6">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-green-100 text-sm mb-2">{product.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">${product.price}</span>
                        <span className="text-green-200 line-through text-sm">${product.originalPrice}</span>
                        <span className="bg-sale text-white text-xs px-2 py-1 rounded-full">
                          -{product.discount}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isLoading={isLoading}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Products Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-dark mb-2">
                {activeCategory === 'all' ? 'All Products' : categories.find(cat => cat.id === activeCategory)?.name}
              </h2>
              <p className="text-text-muted">
                {isLoading ? 'Loading products...' : `Showing ${currentProducts.length} of ${filteredProducts.length} products`}
              </p>
            </div>
            
            {/* Sort Options */}
            <div className="hidden sm:flex items-center space-x-4">
              <label className="text-sm text-text-muted">Sort by:</label>
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Products Grid */}
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center">
                    <Icon name="Package" size={48} className="text-subtle" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-dark mb-2">No products found</h3>
                  <p className="text-text-muted mb-6">
                    We couldn't find any products in this category. Try browsing other categories.
                  </p>
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    View All Products
                  </button>
                </div>
              )}

              {/* Load More Button */}
              {hasMoreProducts && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="bg-surface hover:bg-gray-200 text-text-primary px-8 py-3 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center space-x-2 mx-auto"
                  >
                    {loadingMore ? (
                      <>
                        <Icon name="Loader2" size={20} className="animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More Products</span>
                        <Icon name="ChevronDown" size={20} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Features Section */}
        <section className="mt-20 py-16 bg-surface rounded-2xl">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-text-dark mb-4">
                Why Choose ShopHub?
              </h2>
              <p className="text-text-muted text-lg">
                We're committed to providing the best shopping experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">Fast Shipping</h3>
                <p className="text-text-muted">Free shipping on orders over $50. Get your products delivered quickly and safely.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">Secure Payment</h3>
                <p className="text-text-muted">Your payment information is protected with industry-standard encryption.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="RotateCcw" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">Easy Returns</h3>
                <p className="text-text-muted">Not satisfied? Return your purchase within 30 days for a full refund.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;