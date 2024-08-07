import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '../../../store/useUserStore';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    async function getAllItems() {
      try {
        const response = await axios.get("http://localhost:4000/products/AllProducts");
        console.log('API Response:', response);
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

  const addToCart = (product) => {
    console.log(`Added ${product.productName} to cart`);
    // Add logic to update the cart state or make an API call to add the item to the cart
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='products-container'>
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className='product'>
               <img src={product.productImage ?? 'default-image.png'} alt={`${product.productName} image`} />
            <h2>{product.productName ?? 'No name available'}</h2>
            <h3>{product.productPrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? 'No price available'}</h3>
            <p>{product.productDescription ?? 'No description available'}</p>         
            <p>{product.productsRemaining ?? 'No stock information'} remaining</p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default Home;
