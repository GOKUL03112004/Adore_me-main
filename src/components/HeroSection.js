// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';
import heroimage from '../images/heroimage.jpg';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <img src={heroimage} alt="Hero" />
        <div className="hero-text">
          <h2>Exclusive Offer</h2>
          <p>Get 30% off on all new arrivals</p>
          <button>Shop Now</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
