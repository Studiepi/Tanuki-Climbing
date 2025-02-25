import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { CartContext } from "../CartContext"; // Import Cart Context

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "Products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product); // Add product to the cart
    navigate("/cart"); // Redirect to the cart page
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="img-fluid mb-3" />
      <p>{product.description}</p>
      <p>
        <strong>Price: </strong>${product.price.toFixed(2)}
      </p>
      <p>
        <strong>Stock: </strong>{product.stock}
      </p>
      <button
        className="btn btn-primary"
        onClick={handleAddToCart} // Use the new handler
      >
        Add to Cart
      </button>
      <div className="mt-3">
        <Link to="/cart" className="btn btn-secondary me-2">
          View Cart
        </Link>
        <Link to="/" className="btn btn-secondary">
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
