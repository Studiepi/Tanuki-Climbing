import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { CartContext } from "../CartContext"; // Import the Cart Context

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext); // Access the addToCart function

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
        onClick={() => addToCart(product)} // Ensure this is correctly passing the product
      >
        Add to Cart
      </button> 

    </div>
  );
};

export default ProductDetail;

