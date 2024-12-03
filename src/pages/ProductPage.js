// src/pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../components/context/CartContext'; // Import useCart hook

const ProductPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search);
  const category = query.get('category');

  const { addToCart } = useCart(); // Use the addToCart function from CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/products?filters[categories][category][$eq]=${encodeURIComponent(category)}&populate=*`);
        console.log('API Response:', response.data);
        if (response.data && response.data.data) {
          setProducts(response.data.data);
        } else {
          setError('No products found in this category.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('An error occurred while fetching products.');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    } else {
      setError('No category specified.');
      setLoading(false);
    }
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{category} Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {products.length > 0 ? (
          products.map(product => {
            const imageUrl = product.attributes?.Image?.data?.[0]?.attributes?.url;
            const description = product.attributes?.Description?.[0]?.children?.[0]?.text || 'No description available';

            return (
              <div key={product.id} style={{ margin: '20px', flex: '0 1 calc(33.333% - 40px)', boxSizing: 'border-box' }}>
                {imageUrl ? (
                  <img
                    src={`http://localhost:1337${imageUrl}`}
                    alt={product.attributes?.Name || 'No title available'}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <h3>{product.attributes?.Name || 'No title available'}</h3>
                <p>{description}</p>
                <p>Price: ${product.attributes?.Price || 'N/A'}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button> {/* Add to Cart button */}
              </div>
            );
          })
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
