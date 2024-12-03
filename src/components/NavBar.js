// src/components/NavBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate(); // Initialize navigate

  const handleCategoryClick = (category) => {
    // Navigate to the products page with the selected category as a query parameter
    navigate(`/products?category=${category}`);
  };

  return (
    <nav className="nav-bar">
      <ul>
        <li className="dropdown">
          Men
          <div className="dropdown-content">
            <a onClick={() => handleCategoryClick('Men\'s shirt')}>Shirts</a>
            <a onClick={() => handleCategoryClick('Men\'s pant')}>Pants</a>
            <a onClick={() => handleCategoryClick('Men\'s jackets')}>Jackets</a>
            <a onClick={() => handleCategoryClick('Men\'s suits')}>Suits</a>
          </div>
        </li>
        <li className="dropdown">
          Women
          <div className="dropdown-content">
            <a onClick={() => handleCategoryClick('Women\'s Top')}>Top</a>
            <a onClick={() => handleCategoryClick('Women\'s Skirts')}>Skirts</a>
            <a onClick={() => handleCategoryClick('Women\'s Pant')}>Pants</a>
            <a onClick={() => handleCategoryClick('Women\'s Outerwear')}>Outerwear</a>
          </div>
        </li>
        {/* Add other categories here */}
        <li>Kids</li>
        <li>Beauty</li>
        <li>Watches</li>
        <li>Gifts</li>
        <li>Brands</li>
        <li>Homestop</li>
        <li>Style Hub</li>
        <li>Bargains</li>
        <li>Luxe</li>
      </ul>
    </nav>
  );
}

export default NavBar;
