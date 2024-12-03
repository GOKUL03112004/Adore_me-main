import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Make sure Font Awesome is imported
import './Header.css';

function Header({ isLoggedIn }) {
  const navigate = useNavigate(); // Initialize navigate for navigation

  // Function to navigate to home page
  const handleToGoHome = () => navigate('/');

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1 onClick={handleToGoHome} style={{ cursor: 'pointer' }}>Adore Me</h1>
        </div>
        
        {/* Search bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search for products, brands, and more" />
        </div>

        {/* User Actions */}
        <div className="user-actions">
          {/* Show Login button only if not logged in */}
          {!isLoggedIn && (
            <button onClick={() => navigate('/login')}>Login</button>
          )}

          {/* Cart icon with navigation */}
          <i className="fas fa-shopping-cart" onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}></i>
          
          {/* Wishlist icon with navigation */}
          <i className="fas fa-heart" onClick={() => navigate('/wishlist')} style={{ cursor: 'pointer' }}></i>

          {/* User icon with navigation */}
          <i
            className="fas fa-user"
            onClick={() => navigate('/account')}
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
