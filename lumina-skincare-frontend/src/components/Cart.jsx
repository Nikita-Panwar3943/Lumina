import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import PaymentGateway from './PaymentGateway';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('lumina-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
        setCartItems([]);
      }
    }

    // Listen for cart updates
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem('lumina-cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error parsing cart data:', error);
        }
      }
    };

    // Handle user login - clear cart for new session
    const handleUserLogin = () => {
      setCartItems([]);
      localStorage.removeItem('lumina-cart');
      window.dispatchEvent(new Event('cartUpdated'));
    };

    // Handle user logout - clear cart
    const handleUserLogout = () => {
      setCartItems([]);
      localStorage.removeItem('lumina-cart');
      window.dispatchEvent(new Event('cartUpdated'));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleStorageChange);
    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogout);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogout);
    };
  }, []);

  // Open cart when cart button is clicked
  useEffect(() => {
    const handleCartClick = (e) => {
      if (e.target.closest('.cart-btn')) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };
    
    document.addEventListener('click', handleCartClick);
    return () => document.removeEventListener('click', handleCartClick);
  }, []);

  const updateCart = (newItems) => {
    setCartItems(newItems);
    localStorage.setItem('lumina-cart', JSON.stringify(newItems));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    updateCart(updatedItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 50 ? 0 : 9.99;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    window.location.href = '/checkout';
  };

  const handlePaymentSuccess = (paymentData) => {
    setShowPayment(false);
    setCartItems([]);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        text-align: center;
      ">
        <div style="color: #48bb78; font-size: 3rem; margin-bottom: 1rem;">✓</div>
        <h2 style="margin: 0 0 1rem 0; color: #2d3748;">Payment Successful!</h2>
        <p style="margin: 0 0 1rem 0; color: #4a5568;">Order ID: ${paymentData.orderId}</p>
        <p style="margin: 0 0 1rem 0; color: #4a5568;">Total: $${paymentData.amount.toFixed(2)}</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: #667eea;
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">Continue Shopping</button>
      </div>
    `;
    successMessage.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 9999;
    `;
    
    document.body.appendChild(successMessage);
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping();
  const tax = calculateTax();
  const total = calculateTotal();

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)}>
        <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h3>Shopping Cart ({cartItems.length})</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={48} />
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                      
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">${item.price}</p>
                    </div>
                      
                    <div className="item-quantity">
                      <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                      
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                      
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
                
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              
              <p className="free-shipping-notice">
                {subtotal >= 50 
                  ? '🎉 You qualify for free shipping!' 
                  : `Add $${(50 - subtotal).toFixed(2)} more for free shipping`
                }
              </p>
            </>
          )}
        </div>
      </div>

      {showPayment && (
        <PaymentGateway
          cartItems={cartItems}
          total={total}
          onPaymentSuccess={handlePaymentSuccess}
          onBack={() => setShowPayment(false)}
        />
      )}
    </>
  );
};

export default Cart;
