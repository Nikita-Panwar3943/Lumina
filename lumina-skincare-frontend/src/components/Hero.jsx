import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Illuminate Your Natural Beauty</h1>
            <p>Discover science-backed skincare formulations that reveal your most radiant self. Clean ingredients, visible results.</p>
            <div className="hero-buttons">
              <a href="/collections" className="btn btn-primary">Shop Now</a>
              <a href="/about" className="btn btn-secondary">Learn More</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <h3>50K+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat">
                <h3>4.9/5</h3>
                <p>Average Rating</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Clean Ingredients</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-placeholder">
              <img src="https://www.bellobello.my/wp-content/uploads/2022/08/boldlipessentials-2.jpg" alt="Skincare products" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
