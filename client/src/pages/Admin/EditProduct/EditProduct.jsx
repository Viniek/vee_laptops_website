import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../../../store/useUserStore';
import Admin from '../../../../Components/AdminNav/Admin';
import './EditProduct.css'

function EditProduct() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams(); 
  const navigate = useNavigate();
  const users = useUserStore((state) => state.user);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(`http://localhost:4000/products/getOneProduct/${id}`, { withCredentials: true });
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching item.");
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  const handleSubmit = async (values) => {
    if (users.role === "admin") {
      try {
        setLoading(true);
        setError("");
        const response = await axios.patch(`http://localhost:4000/products/updateProduct/${id}`, values, { withCredentials: true });
        if (response.data.success) {
          formik.resetForm();
          navigate('/AdminHome'); 
        } else {
          setError("Failed to update item.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("You do not have permission to update this item.");
    }
  };

  const formik = useFormik({
    initialValues: {
      productImage: item?.productImage || "",
      productName: item?.productName || "",
      productPrice: item?.productPrice || "",
      productDescription: item?.productDescription || "",
      productsRemaining: item?.productsRemaining || ""     
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validate: (values) => {
      let errors = {};
      if (!values.productImage) errors.productImage = "Product image is required";
      if (!values.productName) errors.productName = "Product Name is required";
      if (!values.productPrice) errors.productPrice = "Product Price is required";
      if (!values.productDescription) errors.productDescription = "Product Description is required";
      if (!values.productsRemaining) errors.productsRemaining = "Products Remaining is required";
      return errors;
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Admin />
      <div className='editItemContainer'>
        <h1>Edit Product</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Same fields as AddProduct but pre-filled with product data */}
          <div className="EditProducts">
            <label>Product Image</label>
            <input
              type="text"
              name="productImage"
              value={formik.values.productImage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.productImage && formik.errors.productImage && (
              <p>{formik.errors.productImage}</p>
            )}
          </div>

          <div className="EditProducts">
            <label>Product Name</label>
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

          <div className="EditProducts">
            <label>Product Price</label>
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

          <div className="EditProducts">
            <label>Product Description</label>
            <input
              type="text"
              name="productDescription"
              value={formik.values.productDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.productDescription && formik.errors.productDescription && (
              <p>{formik.errors.productDescription}</p>
            )}
          </div>

          <div className="EditProducts">
            <label>Products Remaining</label>
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
            {loading ? "Please wait..." : "Update Product"}
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProduct;
