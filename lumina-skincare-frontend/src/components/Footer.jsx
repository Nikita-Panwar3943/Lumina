import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <h3>LUMINA</h3>
              <p>Illuminate Your Natural Beauty</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#collections">Collections</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Customer Care</h4>
            <ul>
              <li><a href="#shipping">Shipping & Returns</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#track">Track Order</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>hello@lumina.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>1-800-LUMINA</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Beauty Lane, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="trust-badges">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" />
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" />
            <img src="https://img.icons8.com/color/48/000000/american-express.png" alt="Amex" />
          </div>
          <p>&copy; 2024 LUMINA Skincare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
