import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import Admin from '../../../Components/AdminNav/Admin';
import '../../../Components/AdminNav/Admin.css'
import EditProduct from './EditProduct/EditProduct';
import { useParams } from 'react-router-dom';

function AdminHome() {
const[products,setProducts]=useState([]);
const[loading,setLoading]=useState(true);
const [error, setError] = useState(null);
const[requests,setRequests]=useState([]);
const[showRequests,SetShowRequests]=useState(false);
const[totalProducts,setTotalProducts]=useState(0);
const[form,setForm]=useState({
  productImage:"",
  productName:'',
  productPrice:"",
  productDescription:"",
  productsRemaining:""
})

const fetchProducts = async () => {
  if (user.role === "admin") {
    try {
      const response = await axios.get("http://localhost:4000/products/AllProducts", { withCredentials: true });
      setProducts(response.data);
      setTotalProducts(response.data.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
};



useEffect(() => {
  async function getAllProducts(){
    try {
      const response=await axios.get("http://localhost:4000/products/AllProducts")
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

const handleAddProduct=async ()=>{
  try{
    await axios.post(`http://localhost:4000/products/AddProduct`,form);
    fetchProducts();
    console.log(response);
  }catch(error){
    console.error("Error adding Product...",error)
    console.log(error.message);
  }
};

const handleEditProduct=(products)=>{
  setForm({
    productImage:"",
    productName:'',
    productPrice:"",
    productDescription:"",
    productsRemaining:""
  });
}


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
   <section className='adminProducts-container'>
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className='product'>
            <img src={product.productImage ?? 'default-image.png'} alt={`${product.productName} image`} />
            <h2>{product.productName ?? 'No name available'}</h2>
            <h3>{product.productPrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? 'No price available'}</h3>
            <p>{product.productDescription ?? 'No description available'}</p>
            
            <p>{product.productsRemaining ?? 'No stock information'} remaining</p>


           <div className='adminbuttons'>
           <Link to={`/EditProduct/${product.id}`} className="editbtn"> Edit</Link>
                      
              
           <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
           </div>
          </div>
        ))
      ) : (
        <p>No products available...</p>
      )}

    
      {/* <Link to="/AddProduct" > */}
        {/* <button className='AddproductContainer' onClick={handleAddProduct}></button> */}
        {/* </Link> */}
        <Link to="/AddProduct">
        <button className="addProductbtn">+</button></Link>
    </section>
  </>
  )
}

export default AdminHome