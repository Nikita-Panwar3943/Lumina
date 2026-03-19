import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="newsletter section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <div className="newsletter-icon">
              <Mail size={48} />
            </div>
            <h2>Get 15% Off Your First Order</h2>
            <p>Join our community for exclusive offers, skincare tips, and early access to new products.</p>
          </div>
          
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                <Send size={20} />
              </button>
            </div>
            <p className="newsletter-privacy">
              By subscribing, you agree to our Privacy Policy. No spam, unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
