// src/components/FeaturedProducts.js
import React from 'react';
import './FeaturedProducts.css';

function FeaturedProducts() {
  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="product-grid">
        <div className="product-card">
          <img src="https://example.com/product1.jpg" alt="Product 1" />
          <h3>Product 1</h3>
          <p>$49.99</p>
        </div>
        <div className="product-card">
          <img src="https://example.com/product2.jpg" alt="Product 2" />
          <h3>Product 2</h3>
          <p>$59.99</p>
        </div>
        {/* Add more products as needed */}
      </div>
    </section>
  );
}

export default FeaturedProducts;
