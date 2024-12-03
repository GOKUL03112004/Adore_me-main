// src/components/ParentComponent.js
import React, { useState, useEffect } from 'react';
import Login from './login';  // Import the Login component

function ParentComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // Log user details whenever they update
  useEffect(() => {
    console.log('User details updated:', userDetails);
  }, [userDetails]);

  return (
    <div>
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setUserDetails={setUserDetails}
      />
      {userDetails ? (
        <div>
          <h3>Welcome, {userDetails.username}</h3>
          <p>Email: {userDetails.email}</p>
        </div>
      ) : (
        <p>No user details available</p>
      )}
    </div>
  );
}

export default ParentComponent;
