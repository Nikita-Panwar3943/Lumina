import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Radiance Vitamin C Serum",
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
      price: 79.99,
      originalPrice: 99.99,
      image: "https://thmappbkk.blob.core.windows.net/boots/2021/11/9/0fbe9da1-8779-4336-8756-098856287443_large.jpg",
      rating: 5.0,
      reviews: 312,
      badge: "Limited"
    }
  ];

  
  return (
    <section className="featured-products section" id="products">
      <div className="container">
        <div className="section-header text-center mb-3">
          <h2>Featured Products</h2>
          <p>Discover our most-loved skincare essentials</p>
        </div>
        
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
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
                    addToCart(product);
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
                
                              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
