import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./CartContext"; // Ensure this is imported

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);