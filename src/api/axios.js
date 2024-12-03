import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337', // Replace with your Strapi URL
});

export default api;
