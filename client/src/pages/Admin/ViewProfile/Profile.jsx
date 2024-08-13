import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import useUserStore from "../../../../store/useUserStore";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Admin from "../../../../Components/AdminNav/Admin";
import { toast } from "react-simple-toasts";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = "First name is required";
      }
      if (!values.lastName) {
        errors.lastName = "Last name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.patch(
          `http://localhost:4000/users/UpdateUser/${userId}`,
          values,
          { withCredentials: true },
        );
        if (response.data.success) {
          toast("Profile Updated Successfully...");
          formik.resetForm();
          navigate("/AdminUsers");
        } else {
          setError("An error occurred while updating profile...");
        }
      } catch (error) {
        console.error("An error occurred updating profile", error);
        setError("An error occurred while updating profile...");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/users/SingleUser/${userId}`,
          { withCredentials: true },
        );
        if (response.data.success) {
          formik.setValues(response.data.data);
        } else {
          setError("An error occurred while fetching user...");
        }
      } catch (error) {
        console.error("An error occurred fetching user", error);
        setError("An error occurred while fetching user...");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  return (
    <>
      <Admin />
      <div className="editProfileContainer">
        <h1>Edit Profile</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="EditProfile">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p>{formik.errors.firstName}</p>
            )}
          </div>

          <div className="EditProfile">
            <label>Last Name</label>
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
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p>{formik.errors.email}</p>
            )}
          </div>

          {error && <p className="error">{error}</p>}
          <button type="submit" className="EditProductbtn" disabled={loading}>
            {loading ? "Please wait..." : "Update profile"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
