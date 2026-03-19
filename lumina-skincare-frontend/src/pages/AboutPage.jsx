import React from 'react';
import { Leaf, Heart, Award, Users } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & Chief Formulator",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Board-certified dermatologist with 15+ years of experience in cosmetic science."
    },
    {
      name: "Michael Rodriguez",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Passionate about bringing clean, effective skincare to everyone."
    },
    {
      name: "Emma Thompson",
      role: "Head of Research",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Leading innovation in natural ingredient research and development."
    }
  ];

  const milestones = [
    { year: "2019", title: "LUMINA Founded", description: "Started with a mission to create clean, effective skincare" },
    { year: "2020", title: "First Product Launch", description: "Released our bestselling Radiance Serum" },
    { year: "2021", title: "50K Customers", description: "Reached our first major milestone" },
    { year: "2022", title: "Retail Expansion", description: "Partnered with premium retailers nationwide" },
    { year: "2023", title: "International Launch", description: "Expanded to 15 countries worldwide" },
    { year: "2024", title: "Innovation Award", description: "Recognized for breakthrough formulations" }
  ];

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero">
          <h1>Our Story</h1>
          <p className="hero-subtitle">Transforming skincare through science and nature</p>
          <div className="hero-image">
            <img src="https://i.pinimg.com/originals/97/cf/14/97cf14d27876a9b8141249d1b249c363.jpg" alt="About LUMINA" />
          </div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>Born from a Passion for Perfect Skin</h2>
            <p>
              LUMINA was founded in 2019 by Dr. Sarah Chen, a board-certified dermatologist who saw a gap in the skincare market. Too many products were either ineffective, loaded with harmful chemicals, or ridiculously expensive.
            </p>
            <p>
              We believe everyone deserves access to premium, science-backed skincare that actually works. Our formulations combine the best of nature and science, using only the finest ingredients that are proven to deliver results.
            </p>
            <p>
              Today, LUMINA serves over 100,000 customers worldwide, helping people achieve their best skin ever. We're proud to be cruelty-free, sustainable, and committed to making a positive impact on both your skin and the planet.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Leaf size={32} />
              </div>
              <h3>Clean Ingredients</h3>
              <p>We use only natural, ethically sourced ingredients that are safe for your skin and the environment.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Heart size={32} />
              </div>
              <h3>Cruelty-Free</h3>
              <p>We never test on animals and are proud to be certified cruelty-free by PETA.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Award size={32} />
              </div>
              <h3>Science-Backed</h3>
              <p>Every formula is developed by dermatologists and clinically proven to deliver results.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Users size={32} />
              </div>
              <h3>Customer First</h3>
              <p>Your satisfaction is our priority. We stand behind every product with our 30-day guarantee.</p>
            </div>
          </div>
        </div>

        <div className="timeline-section">
          <h2>Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
