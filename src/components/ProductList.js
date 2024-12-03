import React, { useEffect, useState } from 'react';

const ProductsList = ({ category }) => { // Accept category as a prop
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`http://localhost:1337/api/products?populate=categories&filters[categories][name][$eq]=${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category); // Fetch products based on the given category
    }
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{category} Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.attributes.Name}</h3>
            <p>{product.attributes.Description[0].children[0].text}</p>
            <p>Price: ${product.attributes.Price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
