import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductCard.css';
import { useCart } from './context/CartContext'; // Import the useCart hook

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Use the addToCart function from the context

  // Shuffle function to randomize the products array
  const shuffleArray = (array) => {
    let shuffledArray = [...array]; // Copy the original array to avoid mutation
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/products?populate=*');
        if (response.data && response.data.data) {
          const shuffledProducts = shuffleArray(response.data.data); // Shuffle products
          const randomTenProducts = shuffledProducts.slice(0, 10); // Slice the first 10 products
          setProducts(randomTenProducts);
        } else {
          setError('No data found');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-card-container">
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map(product => {
          const imageUrl = product.attributes?.Image?.data?.[0]?.attributes?.url;
          const description = product.attributes?.Description?.[0]?.children?.[0]?.text || 'No description available';
          return (
            <div key={product.id} className="product-card">
              {imageUrl ? (
                <img
                  src={`http://localhost:1337${imageUrl}`}
                  alt={product.attributes?.Name || 'No title available'}
                  className="product-image"
                />
              ) : (
                <p>No image available</p>
              )}
              <h3>{product.attributes?.Name || 'No title available'}</h3>
              <p>{description}</p>
              <p>Price: ${product.attributes?.Price || 'N/A'}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button> {/* Add button */}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductCard;
