import React from 'react';
import { Star, Quote } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      review: "LUMINA has completely transformed my skin! The Radiance Serum is incredible - my skin has never looked so bright and healthy. I've tried so many products but this is the first that actually delivered visible results.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Emily Chen",
      location: "Los Angeles, CA",
      rating: 5,
      review: "As someone with sensitive skin, I'm always cautious about new products. LUMINA's gentle formulas have been perfect for me. No irritation, just amazing results. My skin feels so much smoother and hydrated!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Jessica Martinez",
      location: "Miami, FL",
      rating: 5,
      review: "I'm absolutely obsessed with this brand! The quality is outstanding and the results speak for themselves. My friends keep asking what I'm using because my skin is glowing. Worth every penny!",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="section-header text-center mb-3">
          <h2>What Our Customers Say</h2>
          <p>Real results from real people who love LUMINA</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <Quote className="quote-icon" size={24} />
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="filled" />
                  ))}
                </div>
              </div>
              
              <p className="testimonial-text">"{testimonial.review}"</p>
              
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
