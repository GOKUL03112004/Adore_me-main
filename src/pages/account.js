import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

const Account = ({ userDetails, onLogout }) => {
  const [bodyMeasurements, setBodyMeasurements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchBodyMeasurements = async () => {
      if (!userDetails?.userId) {
        if (isMounted) {
          setError("User ID is not available");
          setLoading(false);
        }
        return;
      }
      try {
        const response = await fetch(`http://localhost:1337/api/body-measurements?filters[userid][$eq]=${userDetails.userId}`);
        const data = await response.json();

        if (isMounted) {
          response.ok
            ? setBodyMeasurements(data.data)
            : setError(`Failed to fetch measurements: ${response.statusText}`);
        }
      } catch (err) {
        if (isMounted) setError("Network error while fetching body measurements");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBodyMeasurements();

    return () => {
      isMounted = false;
    };
  }, [userDetails]);

  const handleGoHome = () => navigate('/');
  const handleGoToBodyMeasurements = () => navigate('/body-measurement'); // Navigate to Body Measurements page

  return (
    <div className="account-container">
      <h1>My Account</h1>
      <h2>Profile Information</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {userDetails?.username}</p>
        <p><strong>Email:</strong> {userDetails?.email}</p>
      </div>

      <h2 onClick={handleGoToBodyMeasurements} style={{ cursor: 'pointer' }}>Body Measurements</h2> {/* Make it clickable */}

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : bodyMeasurements && bodyMeasurements.length > 0 ? (
        <div className="measurements-info">
          {bodyMeasurements.map((measurement) => (
            <div key={measurement.id} className="measurement-item">
              <p><strong>Name:</strong>{measurement.attributes.name}</p>
              <p><strong>Height:</strong> {measurement.attributes.height} cm</p>
              <p><strong>Chest:</strong> {measurement.attributes.chest} cm</p>
              <p><strong>Waist:</strong> {measurement.attributes.waist} cm</p>
              <p><strong>Hips:</strong> {measurement.attributes.hips} cm</p>
              <p><strong>Inseam:</strong> {measurement.attributes.inseam} cm</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No body measurements found. Please add your measurements.</p>
      )}

      <div className="account-actions">
        <button className="logout-button" onClick={onLogout}>Logout</button>
        <button onClick={handleGoHome} className="home-button">Go to Home</button>
      </div>
    </div>
  );
};

export default Account;
