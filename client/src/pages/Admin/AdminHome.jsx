import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Admin from '../../../Components/AdminNav/Admin';
import '../../../Components/AdminNav/Admin.css'

function AdminHome() {
const[products,setProducts]=useState([]);
const[loading,setLoading]=useState(true);
const [error, setError] = useState(null);
const[requests,setRequests]=useState([]);
const[showRequests,SetShowRequests]=useState(false);
const[totalProducts,setTotalProducts]=useState(0);

useEffect(() => {
  async function getAllProducts(){
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
  getAllProducts();
}, []);

const handleDeleteProduct= async(id)=>{
  try {
    await axios.delete(`http://localhost:4000/products/DeleteProduct/${id}`)
    setProducts((prevProducts)=>prevProducts.filter((products)=>products.id!==id));
    setTotalProducts((prevTotal)=>prevTotal -1);
  } catch (error) {
    console.error("An error occured while deleting Product...",error)
  }
}
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
           <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
           </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  </>
  )
}

export default AdminHome