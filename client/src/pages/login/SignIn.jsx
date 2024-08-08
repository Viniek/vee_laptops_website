import React, { useState } from "react";
import "./Login.css";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { url_api } from "../../../utils/config.js"
import useUserStore from "../../../store/useUserStore";

toastConfig({ theme: "Colored Themes" });

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const changeuserInformation = useUserStore(
    (state) => state.changeUserInformation,
  );

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("false");
      const response = await fetch("http://localhost:4000/users/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      console.log(response.data);
      const data = await response.json();
      console.log(data.data);
      if (data.success) {
        changeuserInformation(data.data);

        if (data.data.role === "admin") {
          navigate("/AdminHome");
        } 
        else if (data.data.role === "seller") {
          navigate("/Sellers");
        } 
        else {
          navigate("/home");
        }
      } else {
        toast(data.message, { theme: "failure" });
      }
    } catch (e) {
      setError(e.message);
      toast(e.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validate: (formValues) => {
      let errors = {};

      if (formValues.email === "") {
        errors.email = "Email address required";
      } else if (!formValues.email.includes("@")) {
        errors.email = "Enter a valid email...";
      }

      if (formValues.password === "") {
        errors.password = "Password required...";
      }

      return errors;
    },
  });

  return (
    <>
      <section className="schedule_a_visit">
        <h2>Sign Into your Account</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="formfield">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email address..."
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="errorp">{formik.errors.email}</p>
            )}
          </div>

          <div className="formfield">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="errorp">{formik.errors.password}</p>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign up"}
          </button>
        </form>
        {error && <p className="errorp">{error}</p>}
      </section>
    </>
  );
}

export default SignIn;
