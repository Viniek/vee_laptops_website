import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore'
import Admin from '../../../Components/AdminNav/Admin';

function  EditProduct() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams(); 
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
async function fetchProduct() {
      try {
       const response = await axios.get(`http://localhost:4000/products/getOneProduct/${product.id}`);
console.log(response);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching product.");
        setLoading(false);
      }
    }


    fetchProduct();
  }, [id]);

  const handleSubmit = async (values) => {
    // if (user.role === "admin") {
      try {
        setLoading(true);
        setError("");
        const response = await axios.patch(`http://localhost:4000/products/updateProduct/${id}`,
          values,
          { withCredentials: true }
        );
        console.log(response);
        if (response.data.success) {
            setMessage("Product updated successfully");
            formik.resetForm();
          navigate('/AdminHome'); 
        } else {
          setError("Failed to update product.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    // } else {
    //   setError("You do not have permission to update this product.");
    // }
  };

  const formik = useFormik({
    initialValues: {
      productImage:product?.productImage ||"",
      productName:product?.productName ||'',
      productPrice:product?.productPrice ||"",
      productDescription:product?.productDescription ||"",
      productsRemaining:product?. productsRemaining ||""
    },
    enableReinitialize: true,
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

//   if (loading) return <p>Loading...</p>;

  return (
    <>
      <AdminNav />
      <div className='editProductContainer'>
        <h1>Edit Product</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Same fields as AddProduct but pre-filled with product data */}
          <div className="EditProducts">
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

          <div className="EditProducts">
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

          <div className="EditProducts">
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

          <div className="EditProducts">
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

          <div className="EditProducts">
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
      </div>
    </>
  );
}

export default EditProduct;
// import React, { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import useUserStore from '../../../store/useUserStore';
// import AdminNav from '../../../Components/AdminNav/AdminNav';

// function EditProduct() {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const user = useUserStore((state) => state.user);

//   const [image, setImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const cloudname = 'dgn62le6w';
//   const pretest = 'pretest';

//   async function handleImageUpload() {
//     const payload = new FormData();
//     payload.append('file', image);
//     payload.append('upload_preset', pretest);

//     try {
//       setLoading(true);
//       const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/upload`, payload);
//       const imageUrl = response.data.secure_url;
//       setLoading(false);
//       setImageUrl(imageUrl);
//       formik.setFieldValue('productImage', imageUrl);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   function handleChange(e) {
//     setImage(e.target.files[0]);
//   }

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const response = await axios.get(`http://localhost:4000/products/getOneProduct/${id}`);
//         console.log(response);
//         setProduct(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching product.");
//         setLoading(false);
//       }
//     }

//     fetchProduct();
//   }, [id]);

//   const handleSubmit = async (values) => {
//     try {
//       setLoading(true);
//       setError("");
//       const response = await axios.patch(`http://localhost:4000/products/updateProduct/${id}`, values, { withCredentials: true });
//       console.log(response);
//       if (response.data.success) {
//         setMessage("Product updated successfully");
//         formik.resetForm();
//         navigate('/AdminHome');
//       } else {
//         setError("Failed to update product.");
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       productImage: product?.productImage || "",
//       productName: product?.productName || '',
//       productPrice: product?.productPrice || "",
//       productDescription: product?.productDescription || "",
//       productsRemaining: product?.productsRemaining || ""
//     },
//     enableReinitialize: true,
//     onSubmit: handleSubmit,
//     validate: (values) => {
//       let errors = {};
//       if (!values.productImage) errors.productImage = "Product image is required";
//       if (!values.productName) errors.productName = "Product name is required";
//       if (!values.productPrice) errors.productPrice = "Product price is required";
//       if (!values.productDescription) errors.productDescription = "Product description is required";
//       if (!values.productsRemaining) errors.productsRemaining = "Products remaining is required";
//       return errors;
//     },
//   });

//   return (
//     <>
//       <AdminNav />
//       <div className='editProductContainer'>
//         <h1>Edit Product</h1>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="EditProducts">
//             <label>Image</label>
//             <input
//               type="file"
//               className="file"
//               onChange={handleChange}
//             />
//             <button type="button" onClick={handleImageUpload} disabled={loading}>
//               {loading ? "Uploading..." : "Upload Image"}
//             </button>
//             {imageUrl && (
//               <div>
//                 <p>Uploaded Image URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>
//                 <img src={imageUrl} alt="Uploaded" className='imageresult' />
//               </div>
//             )}
//             <input
//               type="text"
//               name="productImage"
//               value={formik.values.productImage}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               required
//               hidden
//             />
//             {formik.touched.productImage && formik.errors.productImage && (
//               <p>{formik.errors.productImage}</p>
//             )}
//           </div>

//           <div className="EditProducts">
//             <label>Product Name</label>
//             <input
//               type="text"
//               name="productName"
//               value={formik.values.productName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               required
//             />
//             {formik.touched.productName && formik.errors.productName && (
//               <p>{formik.errors.productName}</p>
//             )}
//           </div>

//           <div className="EditProducts">
//             <label>Product Price</label>
//             <input
//               type="number"
//               name="productPrice"
//               value={formik.values.productPrice}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               required
//             />
//             {formik.touched.productPrice && formik.errors.productPrice && (
//               <p>{formik.errors.productPrice}</p>
//             )}
//           </div>

//           <div className="EditProducts">
//             <label>Product Description</label>
//             <input
//               type="text"
//               name="productDescription"
//               value={formik.values.productDescription}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               required
//             />
//             {formik.touched.productDescription && formik.errors.productDescription && (
//               <p>{formik.errors.productDescription}</p>
//             )}
//           </div>

//           <div className="EditProducts">
//             <label>Products Remaining</label>
//             <input
//               type="number"
//               name="productsRemaining"
//               value={formik.values.productsRemaining}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               required
//             />
//             {formik.touched.productsRemaining && formik.errors.productsRemaining && (
//               <p>{formik.errors.productsRemaining}</p>
//             )}
//           </div>

//           {error && <p className="error">{error}</p>}
//           <button type="submit" className="EditProductbtn" disabled={loading}>
//             {loading ? "Please wait..." : "Update Product"}
//           </button>
//           <p className='updateMessage'>{message}</p>
//         </form>
//       </div>
//     </>
//   );
// }

// export default EditProduct;
