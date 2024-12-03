// Login Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login({ setIsLoggedIn, setUserDetails }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRedirectOptions, setShowRedirectOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await loginUser(email, password);
    setLoading(false);

    if (response.success) {
      setIsLoggedIn(true);
      setUserDetails({
        username: response.username,
        email: response.email,
        userId: response.userId,
      });
      console.log("User details set:", {
        username: response.username,
        email: response.email,
        userId: response.userId,
      });

      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);

      setShowRedirectOptions(true);
      console.log('Login successful!');
    } else {
      setError('Login failed. Please try again.');
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      return {
        success: true,
        username: data.user.username,
        email: data.user.email,
        token: data.jwt,
        userId: data.user.id,
      };
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false };
    }
  };

  const handleRedirect = (page) => {
    if (page === 'home') {
      navigate('/');
    } else if (page === 'body-measurement') {
      navigate('/body-measurement');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        {!showRedirectOptions ? (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <div className="redirect-options">
            <h3>Choose your next step</h3>
            <button onClick={() => handleRedirect('home')} className="redirect-btn">Go to Home</button>
            <button onClick={() => handleRedirect('body-measurement')} className="redirect-btn">Go to Body Measurement</button>
          </div>
        )}
        <div className="signup-text">
          New? <a href="/signup" className="signup-link">Signup</a>
        </div>
      </div>
    </div>
  );
}

export default Login;