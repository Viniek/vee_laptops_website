import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '../../../store/useUserStore';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    async function getAllItems() {
      try {
        const response = await axios.get("http://localhost:4000/products/AllProducts");
        console.log('API Response:', response);
        setProducts(response.data);
      } catch (error) {
        console.error("An error occurred while fetching products:", error);
      }
    }
    getAllItems();
  }, []);

  const addToCart = (product) => {
    console.log(`Added ${product.productName} to cart`);
  };

  return (
    <div className='products-container'>
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className='product'>
            <p>{product.productName ?? 'No name available'}</p>
            <h2>{product.productPrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? 'No price available'}</h2>
            <p>{product.productDescription ?? 'No description available'}</p>
            <img src={product.productImage ?? 'default-image.png'} alt={`${product.productName} image`} />
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
