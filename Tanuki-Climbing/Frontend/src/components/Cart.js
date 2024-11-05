// src/components/Cart.js
import React from "react";
import { useCart } from "../CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price} x {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

