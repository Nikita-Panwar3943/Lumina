import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import Cart from './Cart';
import SearchBar from './SearchBar';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('lumina-cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      }
    };

    const checkLoginStatus = () => {
      const currentUser = localStorage.getItem('lumina-current-user');
      setIsLoggedIn(!!currentUser);
    };

    updateCartCount();
    checkLoginStatus();
    
    // Listen for storage changes and custom events
    const handleStorageChange = () => {
      updateCartCount();
      checkLoginStatus();
    };
    const handleCustomEvent = () => {
      updateCartCount();
      checkLoginStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCustomEvent);
    window.addEventListener('userLoggedIn', checkLoginStatus);
    window.addEventListener('userLoggedOut', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCustomEvent);
      window.removeEventListener('userLoggedIn', checkLoginStatus);
      window.removeEventListener('userLoggedOut', checkLoginStatus);
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="nav-brand">
              <h1>LUMINA</h1>
            </div>
            
            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/collections">Products</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
              
              <div className="nav-actions">
                <SearchBar />
                <a href={isLoggedIn ? "/profile" : "/auth"} className="account-btn">
                  <User size={20} />
                </a>
                <button className="cart-btn" type="button">
                  <ShoppingCart size={20} />
                  <span className="cart-count">{cartCount}</span>
                </button>
              </div>
            </div>
            
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>
      <Cart />
    </>
  );
};

export default Header;
