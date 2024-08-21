import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-simple-toasts";
import "./AddProduct.css";

const cloudname = "dgn62le6w";
const pretest = "pretest";

function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      productImage: "",
      productName: "",
      productPrice: "",
      productDescription: "",
      productsRemaining: "",
    },
    onSubmit: async (values) => {
      if (!uploadedImageUrl) {
        formik.setFieldError("productImage", "Image upload is required.");
        return;
      }
      values.productImage = uploadedImageUrl;
      await handleSubmit(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.productImage)
        errors.productImage = "Product image is required";
      if (!values.productName) errors.productName = "Product Name is required";
      if (!values.productPrice)
        errors.productPrice = "Product Price is required";
      if (!values.productDescription)
        errors.productDescription = "Product Description is required";
      if (!values.productsRemaining)
        errors.productsRemaining = "Products Remaining is required";
      return errors;
    },
  });

  const handleImageUpload = async (event) => {
    const file = event.currentTarget.files[0];
    if (!file) return;

    const payload = new FormData();
    payload.append("file", file);
    payload.append("upload_preset", pretest);

    try {
      setImageLoading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/upload`,
        payload,
      );
      setUploadedImageUrl(response.data.secure_url);
      formik.setFieldValue("productImage", response.data.secure_url);
    } catch (error) {
      console.error("Image upload error:", error);
      toast("Image upload failed. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:4000/products/AddProduct",
        values,
      );
      console.log("Response:", response);

      if (response.data.success === true) {
        toast("Product Added to Database");
        formik.resetForm();
        setUploadedImageUrl("");
        setSelectedFile(null);
        navigate("/AdminHome");
      } else {
        toast("Product created successfully...");
      }
    } catch (error) {
      console.error("Error message:", error.message);
      console.error("Error response:", error.response);

      toast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="AddProductForm" onSubmit={formik.handleSubmit}>
      <div className="AddProduct">
        <label>Image</label>
        <input
          type="file"
          name="productImage"
          onChange={handleImageUpload}
          required
        />
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={imageLoading}
        >
          {imageLoading ? "Uploading..." : "Upload Image"}
        </button>
        {uploadedImageUrl && (
          <div>
            <p>
              Uploaded Image URL:{" "}
              <a
                href={uploadedImageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {uploadedImageUrl}
              </a>
            </p>
            <img
              src={uploadedImageUrl}
              alt="Uploaded"
              className="imageresult"
            />
          </div>
        )}
        {formik.errors.productImage && (
          <p className="error">{formik.errors.productImage}</p>
        )}
      </div>

      <div className="AddProduct">
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
          <p className="error">{formik.errors.productName}</p>
        )}
      </div>

      <div className="AddProduct">
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
          <p className="error">{formik.errors.productPrice}</p>
        )}
      </div>

      <div className="AddProduct">
        <label>Product Description</label>
        <input
          type="text"
          name="productDescription"
          value={formik.values.productDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.productDescription &&
          formik.errors.productDescription && (
            <p className="error">{formik.errors.productDescription}</p>
          )}
      </div>

      <div className="AddProduct">
        <label>Products Remaining</label>
        <input
          type="number"
          name="productsRemaining"
          value={formik.values.productsRemaining}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.productsRemaining &&
          formik.errors.productsRemaining && (
            <p className="error">{formik.errors.productsRemaining}</p>
          )}
      </div>

      {loading && <p className="loading">Submitting, please wait...</p>}
      <button
        type="submit"
        className="AddProductbtn"
        disabled={loading || imageLoading}
      >
        {loading || imageLoading ? "Please wait..." : "Add Product"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default AddProduct;
