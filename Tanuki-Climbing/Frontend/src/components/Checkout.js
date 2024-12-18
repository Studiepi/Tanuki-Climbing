import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [userName, setUserName] = useState(""); // Collect user's name
  const [email, setEmail] = useState(""); // Collect user's email
  const [address, setAddress] = useState(""); // Collect user's address
  const navigate = useNavigate();

  // Calculate the total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Function to handle checkout submission
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/process-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName, // Send user's name
          email, // Send user's email
          address, // Send user's address
          cartItems,
          totalAmount,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        clearCart(); // Clear the cart after successful order
        navigate("/thank-you"); // Redirect to Thank You page
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an issue processing your order. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="userName"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            id="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
      </form>

      <h3>Total: ${totalAmount.toFixed(2)}</h3>

      <button className="btn btn-primary mt-3" onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
