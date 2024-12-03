// src/pages/Cart.js
import React from 'react';
import { useCart } from '../components/context/CartContext'; // Use relative path to access CartContext

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <ul>
          {cart.map(product => (
            <li key={product.id}>
              {product.attributes?.Name} - ${product.attributes?.Price}
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
