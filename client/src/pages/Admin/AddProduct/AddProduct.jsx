import React, { useState } from 'react';
import { useFormik } from "formik";
import axios from "axios";
import Admin from '../../../../Components/AdminNav/Admin';
import "./AddProduct.css"


function AddProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
 async function handleSubmit(values){
    try {
        setLoading(true);
        setError("");
        const response = await axios.post("http://localhost:4000/products/AddProduct",values);
        console.log(response);
        if (response.data.success === true) {
          setMessage("Product Added to Database");
          formik.resetForm();
        } else {
          setError("Failed to add product. Please try again.");
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
 };
 const formik = useFormik({
    initialValues: {
        productImage:"",
        productName:'',
        productPrice:"",
        productDescription:"",
        productsRemaining:""
    },
    onSubmit: handleSubmit,
    validate: (values) => {
        let errors = {};
        if (!values.productImage) errors.productImage = "Iproduct image is required";
        if (!values.productName) errors.productName = "product Name is required";
        if (!values.productPrice) errors.productPrice = "product Price is required";
        if (!values. productDescription) errors. productDescription= " product Description is required";
        if (!values.productsRemaining) errors.productsRemaining = "products Remaining is required";
        return errors;
    
    },
  
  });
  return (
    <>
<form onSubmit={formik.handleSubmit}>

          <div className="AddProduct">
            <label>Image</label>
            <input
              type="text"
              name="image"
              value={formik.values. productImage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched. productImage && formik.errors. productImage && (
              <p>{formik.errors. productImage}</p>
            )}
          </div>

          <div className="AddProduct">
            <label>product Name</label>
            <input
              type="text"
              name="productName"
              value={formik.values.productName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.productName && formik.errors.productName && (
              <p>{formik.errors.productName}</p>
            )}
          </div>

          <div className="AddProduct">
            <label>product Price</label>
            <input
              type="number"
              name="productPrice"
              value={formik.values.productPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.productPrice && formik.errors.productPrice && (
              <p>{formik.errors.productPrice}</p>
            )}
          </div>

          <div className="AddProduct">
            <label>product Description</label>
            <input
              type="text"
              name="productDescription"
              value={formik.values.productDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.productDescription && formik.errors.productDescription&& (
              <p>{formik.errors.productDescription}</p>
            )}
          </div>

          <div className="AddProduct">
            <label>products Remaining</label>
            <input
              type="number"
              name="productsRemaining"
              value={formik.values.productsRemaining}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.productsRemaining && formik.errors.productsRemaining && (
              <p>{formik.errors.productsRemaining}</p>
            )}
          </div>

         
       
          {error && <p className="error">{error}</p>}
          <button type="submit" className="EditProductbtn" disabled={loading}>
            {loading ? "Please wait..." : "Update product"}
          </button>
        </form>
     
    </>
  );
}

export default AddProduct;
