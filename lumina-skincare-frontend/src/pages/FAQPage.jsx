import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Package, CreditCard, Truck, Shield } from 'lucide-react';
import './FAQPage.css';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItem, setExpandedItem] = useState(null);

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle size={20} /> },
    { id: 'products', name: 'Products', icon: <Package size={20} /> },
    { id: 'orders', name: 'Orders & Shipping', icon: <Truck size={20} /> },
    { id: 'payments', name: 'Payments', icon: <CreditCard size={20} /> },
    { id: 'returns', name: 'Returns & Guarantees', icon: <Shield size={20} /> }
  ];

  const faqs = [
    {
      id: 1,
      category: 'products',
      question: 'What ingredients do you use in your products?',
      answer: 'We use only the highest quality, natural ingredients in our formulations. All our products are free from parabens, sulfates, phthalates, and synthetic fragrances. Each product page lists the full ingredient list, and we are always transparent about what goes into our formulas.'
    },
    {
      id: 2,
      category: 'products',
      question: 'Are your products suitable for sensitive skin?',
      answer: 'Yes! All our products are dermatologist-tested and formulated to be gentle on sensitive skin. We recommend patch testing new products on a small area of skin before full application. If you have specific skin concerns, consult with your dermatologist.'
    },
    {
      id: 3,
      category: 'products',
      question: 'How long will one product last?',
      answer: 'Typically, our products last 3-6 months with daily use. Serums and moisturizers (30ml/50ml) last about 3 months, while cleansers (150ml) can last up to 6 months. Always store products in a cool, dry place away from direct sunlight.'
    },
    {
      id: 4,
      category: 'orders',
      question: 'How long does shipping take?',
      answer: 'Standard shipping (5-7 business days) is free on orders over $50. Express shipping (2-3 business days) is available for $15. International shipping times vary by location (10-20 business days). You\'ll receive a tracking number once your order ships.'
    },
    {
      id: 5,
      category: 'orders',
      question: 'Can I track my order?',
      answer: 'Yes! Once your order ships, you\'ll receive an email with a tracking number. You can also track your order by logging into your account or using our "Track Order" page with your order number and email.'
    },
    {
      id: 6,
      category: 'orders',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. Customs fees may apply depending on your country\'s regulations.'
    },
    {
      id: 7,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.'
    },
    {
      id: 8,
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store credit card details on our servers, and all transactions comply with PCI DSS standards.'
    },
    {
      id: 9,
      category: 'payments',
      question: 'Can I pay in installments?',
      answer: 'Yes! We offer payment plans through Afterpay and Klarna for orders over $100. You can split your payment into 4 interest-free installments.'
    },
    {
      id: 10,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied with your purchase, return it within 30 days for a full refund. Products must be at least 50% unused and in original packaging.'
    },
    {
      id: 11,
      category: 'returns',
      question: 'How do I initiate a return?',
      answer: 'To start a return, email our customer support at support@lumina.com with your order number. We\'ll provide a prepaid return label and instructions. Refunds are processed within 5-7 business days of receiving the returned items.'
    },
    {
      id: 12,
      category: 'returns',
      question: 'Do you offer product guarantees?',
      answer: 'Yes! All our products come with a 30-day satisfaction guarantee. If you don\'t see results within 30 days of consistent use, we\'ll refund your purchase or help you find a better product for your needs.'
    }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="faq-page">
      <div className="container">
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about LUMINA products and services</p>
        </div>

        <div className="faq-categories">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {filteredFAQs.map(faq => (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleExpand(faq.id)}
                >
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle">
                    {expandedItem === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                <div className={`faq-answer ${expandedItem === faq.id ? 'expanded' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="faq-contact">
          <div className="contact-card">
            <h2>Still have questions?</h2>
            <p>Can't find the answer you're looking for? Our customer care team is here to help!</p>
            <div className="contact-options">
              <div className="contact-option">
                <h3>Email Support</h3>
                <p>support@lumina.com</p>
                <span className="response-time">Response within 24 hours</span>
              </div>
              <div className="contact-option">
                <h3>Phone Support</h3>
                <p>1-800-LUMINA</p>
                <span className="response-time">Mon-Fri 9AM-6PM EST</span>
              </div>
              <div className="contact-option">
                <h3>Live Chat</h3>
                <p>Available on our website</p>
                <span className="response-time">Instant responses</span>
              </div>
            </div>
            <button className="btn btn-primary">Contact Support</button>
          </div>
        </div>

        <div className="faq-search">
          <div className="search-card">
            <h2>Can't find what you're looking for?</h2>
            <p>Search our help center or browse our comprehensive guides</p>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for answers..."
                className="search-input"
              />
              <button className="btn btn-secondary">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
