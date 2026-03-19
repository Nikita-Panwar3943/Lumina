import React, { useState } from 'react';
import { CreditCard, Smartphone, Shield, CheckCircle } from 'lucide-react';
import './PaymentGateway.css';

const PaymentGateway = ({ cartItems, total, onPaymentSuccess, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: '',
    upiId: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, Rupay, etc.'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm, etc.'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: Shield,
      description: 'Pay when you receive your order'
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.length < 16) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      if (!formData.cardName) {
        newErrors.cardName = 'Please enter cardholder name';
      }
      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Please enter expiry date';
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    }

    if (paymentMethod === 'upi') {
      if (!formData.upiId) {
        newErrors.upiId = 'Please enter UPI ID';
      }
    }

    if (!formData.email) {
      newErrors.email = 'Please enter email address';
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
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      const paymentData = {
        orderId: 'ORD' + Date.now(),
        amount: total,
        method: paymentMethod,
        items: cartItems,
        timestamp: new Date().toISOString()
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('lumina-orders') || '[]');
      orders.push(paymentData);
      localStorage.setItem('lumina-orders', JSON.stringify(orders));

      // Clear cart
      localStorage.removeItem('lumina-cart');
      window.dispatchEvent(new Event('cartUpdated'));

      onPaymentSuccess(paymentData);
    } catch (error) {
      console.error('Payment error:', error);
      setErrors({ payment: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-gateway">
      <div className="payment-container">
        <div className="payment-header">
          <h2>Payment Method</h2>
          <p>Choose your preferred payment method</p>
        </div>

        <div className="payment-methods">
          {paymentMethods.map(method => (
            <div
              key={method.id}
              className={`payment-method ${paymentMethod === method.id ? 'active' : ''}`}
              onClick={() => setPaymentMethod(method.id)}
            >
              <method.icon size={24} />
              <div className="method-info">
                <h3>{method.name}</h3>
                <p>{method.description}</p>
              </div>
              <div className="method-check">
                {paymentMethod === method.id && <CheckCircle size={20} />}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
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
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="form-section">
              <h3>Card Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Card Number</label>
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
              <div className="form-row">
                <div className="form-group">
                  <label>Cardholder Name</label>
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
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
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
                  <label>CVV</label>
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
          )}

          {paymentMethod === 'upi' && (
            <div className="form-section">
              <h3>UPI Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className={errors.upiId ? 'error' : ''}
                    placeholder="yourname@ybl"
                  />
                  {errors.upiId && <span className="error-message">{errors.upiId}</span>}
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="form-section">
              <div className="cod-info">
                <Shield size={48} />
                <h3>Cash on Delivery</h3>
                <p>Pay with cash when your order is delivered. Additional ₹50 charge may apply for COD orders.</p>
              </div>
            </div>
          )}

          {errors.payment && (
            <div className="error-message payment-error">
              {errors.payment}
            </div>
          )}

          <div className="payment-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="payment-actions">
            <button
              type="button"
              onClick={onBack}
              className="btn btn-secondary"
              disabled={isProcessing}
            >
              Back to Cart
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
