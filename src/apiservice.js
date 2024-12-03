// src/apiService.js
import axios from 'axios';

// Define your Strapi backend URL
const API_URL = 'http://localhost:1337'; // Update with your Strapi backend URL

// Function to get products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Export other API functions as needed
