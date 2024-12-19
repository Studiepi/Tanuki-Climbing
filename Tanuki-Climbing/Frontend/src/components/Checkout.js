import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setIsLoading(true);
    
    // Validate form fields
    if (!userName || !email || !address) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Validate cart
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty");
      setIsLoading(false);
      return;
    }

    try {
      console.log('Starting checkout process...'); // Debug log

      // Log the data being sent
      const orderData = {
        userDetails: {
          name: userName,
          email: email,
          address: address,
        },
        cartItems: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: totalAmount,
        createdAt: serverTimestamp()
      };

      console.log('Order data:', orderData); // Debug log

      // Check if Firestore is initialized
      if (!db) {
        throw new Error('Firestore is not initialized');
      }

      // Add the document to 'orders' collection
      const ordersRef = collection(db, 'orders');
      const docRef = await addDoc(ordersRef, orderData);

      console.log('Order submitted successfully:', docRef.id); // Debug log

      // Handle successful order
      navigate("/thank-you");
      alert('Order placed successfully!');  
      clearCart();

    } catch (error) {
      console.error("Detailed error during checkout:", error); // Detailed error log
      alert(`Error processing order: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = () => {
    navigate("/cart");
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <form onSubmit={(e) => e.preventDefault()}>
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

      <button 
        className="btn btn-primary mt-3" 
        onClick={handleCheckout}
        disabled={isLoading || !userName || !email || !address}
      >
        {isLoading ? 'Processing...' : 'Place Order'}
      </button>
      <button className="btn btn-secondary" onClick={handleCancelOrder}>
        Back to Cart
      </button>
    </div>
  );
};

export default Checkout;