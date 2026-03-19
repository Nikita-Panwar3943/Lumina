import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, ShoppingCart, Heart, Star } from 'lucide-react';
import './CollectionsPage.css';

const CollectionsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'featured'
  });

  const allProducts = [
    {
      id: 1,
      name: "Radiance Vitamin C Serum",
      category: "serums",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-laroche-posay-master-catalog/default/dwe2390383/img/3337875660570/pure-vitamin-c-serum-3337875660570-la-roche-posay.jpg",
      rating: 4.9,
      reviews: 234,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Hydra-Boost Moisturizer",
      category: "moisturizers",
      price: 64.99,
      originalPrice: null,
      image: "https://tse1.mm.bing.net/th/id/OIP.cB4rWvP2qfxqPIul4iicdgHaHa?pid=Api&P=0&h=180",
      rating: 4.8,
      reviews: 189,
      badge: "New"
    },
    {
      id: 3,
      name: "Gentle Cleanser",
      category: "cleansers",
      price: 44.99,
      originalPrice: null,
      image: "https://i5.walmartimages.com/seo/CeraVe-Foaming-Facial-Cleanser-Daily-Face-Wash-for-Normal-to-Oily-Skin-12-fl-oz_a74a3654-07aa-47c6-9377-117b3a532e6e.fc02eb8e8fc31ee17f086caa896a8d87.jpeg",
      rating: 4.7,
      reviews: 156,
      badge: null
    },
    {
      id: 4,
      name: "Vitamin C Brightener",
      category: "serums",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://thmappbkk.blob.core.windows.net/boots/2021/11/9/0fbe9da1-8779-4336-8756-098856287443_large.jpg",
      rating: 5.0,
      reviews: 312,
      badge: "Limited"
    },
    {
      id: 5,
      name: "Niacinamide Booster",
      category: "serums",
      price: 54.99,
      originalPrice: null,
      image: "https://cdn.shop-apotheke.com/images/mp/prod/c928eeede8e94cad89165498fab133d5",
      rating: 4.6,
      reviews: 98,
      badge: null
    },
    {
      id: 6,
      name: "Exfoliating Toner",
      category: "toners",
      price: 38.99,
      originalPrice: null,
      image: "https://tse3.mm.bing.net/th/id/OIP.TxD7L7CIXLH6ZjZDySujXwHaHa?pid=Api&P=0&h=180",
      rating: 4.5,
      reviews: 67,
      badge: null
    }
  ];

  useEffect(() => {
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(product => {
        if (filters.priceRange === 'under-50') return product.price < 50;
        if (filters.priceRange === '50-100') return product.price >= 50 && product.price <= 100;
        if (filters.priceRange === 'over-100') return product.price > 100;
        return true;
      });
    }

    // Sort
    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="collections-page">
      <div className="container">
        <div className="collections-header">
          <h1>Shop Collections</h1>
          <p>Discover our complete range of premium skincare products</p>
        </div>

        <div className="collections-layout">
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>
                <Filter size={20} />
                Filters
              </h3>
              
              <div className="filter-group">
                <h4>Category</h4>
                <div className="filter-options">
                  {['all', 'serums', 'moisturizers', 'cleansers', 'toners'].map(category => (
                    <label key={category} className="filter-option">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                      />
                      <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="filter-options">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: 'under-50', label: 'Under $50' },
                    { value: '50-100', label: '$50 - $100' },
                    { value: 'over-100', label: 'Over $100' }
                  ].map(range => (
                    <label key={range.value} className="filter-option">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.value}
                        checked={filters.priceRange === range.value}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Sort By</h4>
                <div className="filter-options">
                  {[
                    { value: 'featured', label: 'Featured' },
                    { value: 'price-low', label: 'Price: Low to High' },
                    { value: 'price-high', label: 'Price: High to Low' },
                    { value: 'rating', label: 'Highest Rated' }
                  ].map(sort => (
                    <label key={sort.value} className="filter-option">
                      <input
                        type="radio"
                        name="sortBy"
                        value={sort.value}
                        checked={filters.sortBy === sort.value}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      />
                      <span>{sort.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="products-main">
            <div className="products-toolbar">
              <div className="results-count">
                <span>Showing {filteredProducts.length} of {products.length} products</span>
              </div>
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={20} />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            <div className={`products-container ${viewMode}`}>
              {filteredProducts.map(product => (
                <div key={product.id} className={`product-card ${viewMode}`}>
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-actions">
                      <button className="action-btn">
                        <Heart size={18} />
                      </button>
                      <button className="action-btn cart-btn" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const existingCart = JSON.parse(localStorage.getItem('lumina-cart') || '[]');
                        const existingItem = existingCart.find(item => item.id === product.id);
                        
                        if (existingItem) {
                          existingItem.quantity += 1;
                        } else {
                          existingCart.push({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1
                          });
                        }
                        
                        localStorage.setItem('lumina-cart', JSON.stringify(existingCart));
                        
                        // Trigger events to update cart count
                        window.dispatchEvent(new Event('storage'));
                        window.dispatchEvent(new Event('cartUpdated'));
                        
                        // Show success message
                        const successMessage = document.createElement('div');
                        successMessage.textContent = 'Product added to cart!';
                        successMessage.style.cssText = `
                          position: fixed;
                          top: 20px;
                          right: 20px;
                          background: #28a745;
                          color: white;
                          padding: 12px 20px;
                          border-radius: 8px;
                          z-index: 9999;
                          font-weight: 500;
                          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
                        `;
                        document.body.appendChild(successMessage);
                        
                        setTimeout(() => {
                          if (successMessage.parentNode) {
                            successMessage.parentNode.removeChild(successMessage);
                          }
                        }, 3000);
                      }}>
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                            className={i < Math.floor(product.rating) ? "filled" : ""}
                          />
                        ))}
                      </div>
                      <span className="rating-text">{product.rating} ({product.reviews})</span>
                    </div>
                    
                    <div className="product-price">
                      <span className="current-price">${product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>
                    
                    <button className="btn btn-primary add-to-cart">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your filters to see more results</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
