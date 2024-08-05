import React, { useEffect, useState } from 'react'
import './Home.css'

function Home() {
const[products,setProducts]=useState([]);

  useEffect(()=>{
    async function getAllItems(){
      try {
        const response=await axios.get("localhost:4000/products/AllProducts")
        setProducts(response.data);
      } catch (error) {
        res.status(500).json("An error occured")
      }
    }
  })
  return (
    <div>Home</div>
  )
}

export default Home