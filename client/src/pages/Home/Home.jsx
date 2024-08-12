import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../../store/useUserStore";
import toast from "react-simple-toasts";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    async function getAllItems() {
      try {
        const response = await axios.get(
          "http://localhost:4000/products/AllProducts",
        );
        console.log("API Response:", response);
        setProducts(response.data);
      } catch (error) {
        console.error("An error occurred while fetching products:", error);
        setError("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    }
    getAllItems();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const AddToCart = async (productId) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `http://localhost:4000/cart/AddToCart`,
        { productid: productId },
        { withCredentials: true },
      );

      console.log(response.data);

      if (response.data.success) {
        toast("Item Added to cart!!");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="productss-container">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product">
              <img
                src={product.productImage ?? "default-image.png"}
                alt={`${product.productName} image`}
              />
              <h2>{product.productName ?? "No name available"}</h2>
              <h3>
                {product.productPrice?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                }) ?? "No price available"}
              </h3>
              <p>{product.productDescription ?? "No description available"}</p>
              <p>
                {product.productsRemaining ?? "No stock information"} remaining
              </p>
              {/* <button onClick={() => AddToCart(product)}>Add to cart</button> */}

              <button onClick={() => AddToCart(product.id)}>Add to cart</button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
}

export default Home;
