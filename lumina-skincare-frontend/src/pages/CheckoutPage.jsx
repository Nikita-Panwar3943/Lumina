import React, { useState } from 'react';
import { ArrowLeft, User, MapPin, Phone, Mail, CreditCard, Truck } from 'lucide-react';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    if (formData.cardNumber && formData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    if (formData.cardName && !formData.cardName.trim()) {
      newErrors.cardName = 'Please enter cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate order processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        id: 'ORD' + Date.now(),
        customer: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        country: formData.country,
        items: JSON.parse(localStorage.getItem('lumina-cart') || '[]'),
        total: JSON.parse(localStorage.getItem('lumina-cart') || '[]').reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toLocaleDateString(),
        status: 'Processing'
      };

      // Save order
      const orders = JSON.parse(localStorage.getItem('lumina-orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('lumina-orders', JSON.stringify(orders));

      // Clear cart
      localStorage.removeItem('lumina-cart');
      window.dispatchEvent(new Event('cartUpdated'));

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
          <h2 style="margin: 0 0 1rem 0; color: #2d3748;">Order Placed Successfully!</h2>
          <p style="margin: 0 0 1rem 0; color: #4a5568;">Order ID: ${orderData.id}</p>
          <p style="margin: 0 0 1rem 0; color: #4a5568;">Total: $${orderData.total.toFixed(2)}</p>
          <p style="margin: 0 0 1rem 0; color: #4a5568;">We'll send confirmation to ${formData.email}</p>
          <button onclick="window.location.href='/'" style="
            background: #667eea;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 1rem;
          ">Continue Shopping</button>
        </div>
      `;
      document.body.appendChild(successMessage);

    } catch (error) {
      console.error('Checkout error:', error);
      setErrors({ submit: 'Order failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <button className="back-btn" onClick={() => window.history.back()}>
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          <h1>Checkout</h1>
          <p>Please provide your shipping and payment details</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-section">
            <h2>
              <User size={20} />
              Contact Information
            </h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="John"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Doe"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>
                  <Mail size={16} />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label>
                  <Phone size={16} />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h2>
              <MapPin size={20} />
              Shipping Address
            </h2>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="123 Main Street"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'error' : ''}
                  placeholder="New York"
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
              
              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={errors.state ? 'error' : ''}
                  placeholder="NY"
                  maxLength="2"
                />
                {errors.state && <span className="error-message">{errors.state}</span>}
              </div>
              
              <div className="form-group">
                <label>ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? 'error' : ''}
                  placeholder="10001"
                  maxLength="5"
                />
                {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h2>
              <CreditCard size={20} />
              Payment Information
            </h2>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={errors.cardNumber ? 'error' : ''}
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Cardholder Name *</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className={errors.cardName ? 'error' : ''}
                  placeholder="John Doe"
                />
                {errors.cardName && <span className="error-message">{errors.cardName}</span>}
              </div>
              
              <div className="form-group">
                <label>Expiry Date *</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className={errors.expiryDate ? 'error' : ''}
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
              </div>
              
              <div className="form-group">
                <label>CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className={errors.cvv ? 'error' : ''}
                  placeholder="123"
                  maxLength="3"
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>
          </div>

          {errors.submit && (
            <div className="error-message payment-error">
              {errors.submit}
            </div>
          )}

          <div className="checkout-actions">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary checkout-btn"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Order...' : 'Place Order'}
            </button>
          </div>

          <div className="security-notice">
            <Truck size={16} />
            <p>
              <strong>Free Shipping</strong> on orders over $50
            </p>
            <p>
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
