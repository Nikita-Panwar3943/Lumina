import React from 'react';
import { CheckCircle, Leaf, Award, Shield } from 'lucide-react';
import './Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      icon: <Leaf size={32} />,
      title: "Clean Ingredients",
      description: "100% natural and ethically sourced ingredients that are safe for your skin"
    },
    {
      icon: <Award size={32} />,
      title: "Dermatologist Tested",
      description: "Clinically proven formulations tested by skincare professionals"
    },
    {
      icon: <Shield size={32} />,
      title: "30-Day Guarantee",
      description: "Love it or your money back. We're confident you'll see results"
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Visible Results",
      description: "See noticeable improvements in skin texture and radiance"
    }
  ];

  return (
    <section className="benefits section">
      <div className="container">
        <div className="section-header text-center mb-3">
          <h2>Why Choose LUMINA?</h2>
          <p>Experience the difference with our science-backed approach to skincare</p>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
