import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Admin from '../../../Components/AdminNav/Admin';
import '../../../Components/AdminNav/Admin.css'

function AdminHome() {
const[products,setProducts]=useState([]);
const[loading,setLoading]=useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function getAllItems(){
    try {
      const response=await axios.get("http://localhost:4000/products/AllProducts")
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.error("An error occurred while fetching products:", error);
        setError("An error occurred while fetching products.");
    }finally{
      setLoading(false);
    } 
 
  }
  getAllItems();
}, []);
  return (
  <>
   <div className='products-container'>
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className='product'>
            <img src={product.productImage ?? 'default-image.png'} alt={`${product.productName} image`} />
            <h2>{product.productName ?? 'No name available'}</h2>
            <h3>{product.productPrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? 'No price available'}</h3>
            <p>{product.productDescription ?? 'No description available'}</p>
            
            <p>{product.productsRemaining ?? 'No stock information'} remaining</p>


           <div className='adminbuttons'>
           <button onClick={() => addToCart(product)}>Edit</button>
            <button onClick={() => addToCart(product)}>Delete</button>
           </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  </>
  )
}

export default AdminHome