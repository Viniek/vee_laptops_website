import "./Login.css";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:4000/users/CreateUser",
        values,
        { withCredentials: true },
      );

      console.log(response.data);

      if (response.data.success) {
        navigate("/SignIn");
      } else {
        setError(response.data.message);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
    onSubmit: handleSubmit,
    validate: (values) => {
      let errors = {};
      if (values.firstName === "") {
        errors.firstName = "Full name required.";
      } else if (values.firstName.length < 3) {
        errors.firstName = "Must have 3 characters or more.";
      }

      if (values.lastName === "") {
        errors.lastName = "lastName required.";
      } else if (values.lastName.length < 3) {
        errors.lastName = "Must have 3 characters or more.";
      }

      if (values.email === "") {
        errors.email = "Email address required.";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Enter a valid email.";
      }

      if (values.password === "") {
        errors.password = "Password required.";
      }

      if (values.confirmpassword === "") {
        errors.confirmpassword = "Confirm password required.";
      } else if (values.password !== values.confirmpassword) {
        errors.confirmpassword = "Passwords must match.";
      }

      return errors;
    },
  });

  return (
    <>
      <section className="schedule_a_visit">
        <h2>Create Your Account Here!!</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="formfield">
            <label for="firstname">First Name</label>
            <br />
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="firstName e.g. vee..."
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="errorp">{formik.errors.firstName}</p>
            )}
          </div>

          <div className="formfield">
            <label for="llastname">Last Name</label>
            <br />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="LastName e.g. vee..."
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="errorp">{formik.errors.lastName}</p>
            )}
          </div>

          <div className="formfield">
            <label for="email">Email Address</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address..."
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="errorp">{formik.errors.email}</p>
            )}
          </div>

          <div className="formfield">
            <label for="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password..."
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <p className="errorp">{formik.errors.password}</p>
            )}
          </div>

          <div className="formfield">
            <label for="confirmpassword">Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm password..."
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.confirmpassword &&
              formik.errors.confirmpassword && (
                <p className="errorp">{formik.errors.confirmpassword}</p>
              )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Please wait..." : "Signin"}
          </button>

          <p>
            Already have an account? <Link to="/SignIn">Sign up here</Link>
          </p>
          {error && <p className="error">{error}</p>}
        </form>
      </section>
    </>
  );
}

export default CreateAccount;
