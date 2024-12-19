import React from "react";

const ThankYou = () => {
  console.log("Thank you page rendered");

  const handleCancelOrder = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed. We will notify you when it ships.</p>
      <button className="btn btn-secondary" onClick={handleCancelOrder}>
        Back
      </button>
    </div>
  );
};

export default ThankYou;
