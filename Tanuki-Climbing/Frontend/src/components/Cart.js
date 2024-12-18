import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div><p>Your cart is empty!</p>
            <Link to="/" className="btn btn-primary mb-3">
                Back to Main Page
            </Link></div>;
  }

  return (
    <div className="container">
      <h1>Your Cart</h1>
      <Link to="/" className="btn btn-primary mb-3">
        Back to Main Page
      </Link>
      <ul className="list-group">
        {cartItems.map((item) => (
          <li key={item.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{item.name}</h5>
                <p>
                  Quantity: 
                  <button
                    className="btn btn-sm btn-secondary mx-2"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>
                  {item.quantity}
                  <button
                    className="btn btn-sm btn-secondary mx-2"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </p>
                <p>Price: R{item.price.toFixed(2)}</p>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="mt-3">Total: R{calculateTotal().toFixed(2)}</h3>
      <button className="btn btn-secondary mt-3" onClick={clearCart}>
        Clear Cart
      </button>
      <button
        className="btn btn-success mt-3"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;


