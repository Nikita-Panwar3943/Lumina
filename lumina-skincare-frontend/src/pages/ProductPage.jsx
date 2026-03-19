import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Truck, Shield, RefreshCw, Minus, Plus } from 'lucide-react';
import './ProductPage.css';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    name: "Radiance Vitamin C Serum",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviews: 234,
    description: "Transform your skin with our powerful Vitamin C serum. This breakthrough formula delivers 20% pure Vitamin C to brighten, firm, and protect your skin.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f168eb0ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1571781920623-75e96e30a72a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    benefits: [
      "Brightens and evens skin tone",
      "Reduces fine lines and wrinkles",
      "Protects against environmental damage",
      "Boosts collagen production"
    ],
    ingredients: "Vitamin C (20%), Hyaluronic Acid, Vitamin E, Ferulic Acid, Botanical Extracts",
    stock: 15
  };

  const reviews = [
    {
      name: "Sarah J.",
      rating: 5,
      date: "2 weeks ago",
      review: "This serum is amazing! My skin looks so much brighter and the texture has improved significantly."
    },
    {
      name: "Emily R.",
      rating: 5,
      date: "1 month ago",
      review: "I've tried many Vitamin C serums but this one is by far the best. No irritation, just results!"
    }
  ];

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-container">
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
              <div className="product-actions">
                <button className="action-btn">
                  <Heart size={18} />
                </button>
                <button className="action-btn cart-btn" onClick={() => {
                  const existingCart = JSON.parse(localStorage.getItem('lumina-cart') || '[]');
                  const existingItem = existingCart.find(item => item.id === product.id);
                  
                  if (existingItem) {
                    existingItem.quantity += quantity;
                  } else {
                    existingCart.push({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: quantity
                    });
                  }
                  
                  localStorage.setItem('lumina-cart', JSON.stringify(existingCart));
                  
                  // Trigger events to update cart count
                  window.dispatchEvent(new Event('storage'));
                  window.dispatchEvent(new Event('cartUpdated'));
                  
                  // Show success message
                  const successMessage = document.createElement('div');
                  successMessage.textContent = `${quantity} ${product.name} added to cart!`;
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
                    successMessage.remove();
                  }, 3000);
                }}>
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="product-details">
            <div className="product-header">
              <h1>{product.name}</h1>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="filled" />
                  ))}
                </div>
                <span>{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>
            
            <div className="price-section">
              <span className="current-price">${product.price}</span>
              <span className="original-price">${product.originalPrice}</span>
              <span className="discount">25% OFF</span>
            </div>
            
            <div className="stock-info">
              <span className="stock-count">Only {product.stock} left in stock!</span>
              <span className="urgency">Order soon to avoid disappointment</span>
            </div>
            
            <div className="product-description">
              <p>{product.description}</p>
            </div>
            
            <div className="product-benefits">
              <h3>Key Benefits</h3>
              <ul>
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            
            <div className="purchase-section">
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  <Minus size={16} />
                </button>
                <span className="quantity">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="action-buttons">
                <button className="btn btn-primary add-to-cart" onClick={() => {
                  const existingCart = JSON.parse(localStorage.getItem('lumina-cart') || '[]');
                  const existingItem = existingCart.find(item => item.id === product.id);
                  
                  if (existingItem) {
                    existingItem.quantity += quantity;
                  } else {
                    existingCart.push({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: quantity
                    });
                  }
                  
                  localStorage.setItem('lumina-cart', JSON.stringify(existingCart));
                  
                  // Trigger events to update cart count
                  window.dispatchEvent(new Event('storage'));
                  window.dispatchEvent(new Event('cartUpdated'));
                  
                  // Show success message
                  const successMessage = document.createElement('div');
                  successMessage.textContent = `${quantity} ${product.name} added to cart!`;
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
                    successMessage.remove();
                  }, 3000);
                }}>
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="btn btn-secondary wishlist">
                  <Heart size={20} />
                </button>
              </div>
            </div>
            
            <div className="trust-badges">
              <div className="badge">
                <Truck size={20} />
                <span>Free Shipping</span>
              </div>
              <div className="badge">
                <Shield size={20} />
                <span>30-Day Guarantee</span>
              </div>
              <div className="badge">
                <RefreshCw size={20} />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="product-tabs">
          <div className="tab-content">
            <h3>Full Ingredients List</h3>
            <p>{product.ingredients}</p>
          </div>
        </div>
        
        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <h4>{review.name}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" className="filled" />
                    ))}
                  </div>
                </div>
                <p className="review-text">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
