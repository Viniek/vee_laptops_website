import React, { useState,useEffect} from 'react'
import './Profile.css'
import axios from 'axios'
import useUserStore from '../../../../store/useUserStore'
import {useFormik} from 'formik'
import { useNavigate,useParams } from 'react-router-dom'
import Admin from '../../../../Components/AdminNav/Admin'
import './Profile.css'

function Profile() {
const[profile,setProfile]=useState([])
const[users,setUsers]=useState([])
const user=useUserStore((state)=>state.user)
const[loading,setLoading]=useState(false)
const[error,setError]=useState([])
const{userId}=useParams();
const navigate =useNavigate();

useEffect(()=>{
  const EditProfile=async ()=>{
    

  try {
    setLoading(true)
    const response= await axios.get(`http://localhost:4000//users/SingleUser/${userId}`,{withCredentials:true})
    console.log(response);
    setProfile(response.data.data)

  } catch (error) {
    console.log(error.message);
    console.error("An error occured Fetching User",error)
    setError("An error ocured while fetching user...")
  }finally{
    setLoading(false)
  }
}
  EditProfile();
},[user,userId,navigate]);

const handleSubmit=async ()=>{
  try {
    setLoading(true)
    const response= await axios.patch(`http://localhost:4000/users/UpdateUser${userId}`,
    values,
    {withCredentials:true})
    console.log(response);
    if(response.data.success){
      toast("Product Updated Successfully...")
      formik.resetGorm();
      navigate("/AdminHome")
      console.log(response.data.data);
    }else{
      setError("An error Occured while Updating profile...")
    }  
  } catch (error) {
    console.error("An error occured Updating Profile",error)
    setError("An error Occured while Updating profile...")
  }finally{
    setLoading(false)
  }
}

const formik = useFormik({
  initialValues: {
    firstName: "",
    lastName: "",
    email: "",
  
  },

  onSubmit: handleSubmit,

});


  return (
  <>
   <Admin />
      <div className='editProfileContainer'>
        <h1>Edit Profile</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Same fields as AddProduct but pre-filled with product data */}
          <div className="EditProfile">
            <label>firstName</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.firstName && formik.errors.firstName&& (
              <p>{formik.errors.firstName}</p>
            )}
          </div>
 
          <div className="EditProfile">
            <label>lastName</label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p>{formik.errors.lastName}</p>
            )}
          </div>

          <div className="EditProfile">
            <label>email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email&& formik.errors.email&& (
              <p>{formik.errors.email}</p>
            )}
          </div>        
       
          {error && <p className="error">{error}</p>}
          <button type="submit" className="EditProductbtn" disabled={loading}>
            {loading ? "Please wait..." : "Update product"}
          </button>
        </form>
      </div>
  </>
  )
}

export default Profile