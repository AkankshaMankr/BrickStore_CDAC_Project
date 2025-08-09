import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const accentColor = "#1ec6b6";

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
      pincode: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .matches(
          /^[A-Za-z]{2,}(?: [A-Za-z]{2,})$/,
          "Enter name in format: Firstname Lastname"
        )
        .required("Name is required"),
      contact: Yup.string()
        .matches(/^(?!00)[0-9]{10}$/, "Enter a valid 10-digit mobile number")
        .required("Mobile number is required"),
      email: Yup.string()
        .matches(/^[A-Za-z][A-Za-z0-9]*@gmail\.com$/, "Enter valid email id")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Include at least one uppercase letter")
        .matches(/[a-z]/, "Include at least one lowercase letter")
        .matches(/[0-9]/, "Include at least one number")
        .matches(/[!@#$%^&*]/, "Include one special character (!@#$%^&*)")
        .required("Password is required"),
      pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
        .test("valid-range", "Pincode must be valid", (value) => {
          const num = parseInt(value, 10);
          return num >= 100000 && num <= 999999;
        })
        .required("Pincode is required"),
      address: Yup.string()
        .min(10, "Address should be at least 10 characters")
        .required("Address is required"),
    }),
    onSubmit: (values) => {
      const userData = {
        userName: values.name,
        contact: values.contact,
        email: values.email,
        password: values.password,
        pincode: values.pincode,
        address: values.address,
      };

      axios
        .post(`${config.API_URL}/customer/registerUser`, userData)
        .then(() => {
          toast.success("Registration successful!", { autoClose: 1500 });
          navigate("/login");
        })
        .catch(() => {
          toast.error("Error registering user. Please try again.");
        });
    },
  });

  return (
    <>
      <style>
        {`
          ::placeholder {
            color: #adb5bd;
            opacity: 1;
          }
        `}
      </style>

      <div
        style={{
          backgroundColor: "#242a33",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <ToastContainer />
        <div
          className="shadow-lg p-4 rounded"
          style={{
            backgroundColor: "#1a1f26",
            width: "100%",
            maxWidth: "420px",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(30, 198, 182, 0.3)",
          }}
        >
          <h3 className="text-center mb-4 fw-bold" style={{ color: accentColor }}>
            Connect with BrickStore
          </h3>

          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#ffffff" }}>
                Name:
              </label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className="form-control"
                placeholder="Enter Your Full Name"
                style={{
                  border: `1px solid ${accentColor}`,
                  borderRadius: "8px",
                }}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger small">{formik.errors.name}</div>
              )}
            </div>

            {/* Contact */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#ffffff" }}>
                Mobile:
              </label>
              <input
                type="text"
                {...formik.getFieldProps("contact")}
                className="form-control"
                placeholder="Enter mobile number"
                style={{
                  border: `1px solid ${accentColor}`,
                  borderRadius: "8px",
                }}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger small">{formik.errors.contact}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#ffffff" }}>
                Email:
              </label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
                placeholder="Enter your email"
                style={{
                  border: `1px solid ${accentColor}`,
                  borderRadius: "8px",
                }}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger small">{formik.errors.email}</div>
              )}
            </div>

            {/* Pincode */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#ffffff" }}>
                Pincode:
              </label>
              <input
                type="text"
                {...formik.getFieldProps("pincode")}
                className="form-control"
                placeholder="Enter pincode"
                style={{
                  border: `1px solid ${accentColor}`,
                  borderRadius: "8px",
                }}
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <div className="text-danger small">{formik.errors.pincode}</div>
              )}
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#ffffff" }}>
                Address:
              </label>
              <textarea
                {...formik.getFieldProps("address")}
                className="form-control"
                placeholder="Enter full address"
                rows="2"
                style={{
                  border: `1px solid ${accentColor}`,
                  borderRadius: "8px",
                }}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger small">{formik.errors.address}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label" style={{ color: "#ffffff" }}>
                Password:
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className="form-control"
                  placeholder="Enter secure password"
                  style={{
                    border: `1px solid ${accentColor}`,
                    borderRadius: "8px",
                  }}
                />
                <span
                  onClick={togglePassword}
                  style={{
                    position: "absolute",
                    right: "12px",
                    cursor: "pointer",
                    color: "#6c757d",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger small">{formik.errors.password}</div>
              )}
            </div>

            {/* Submit */}
            <div className="mb-3">
              <button
                type="submit"
                className="btn w-100"
                style={{
                  backgroundColor: accentColor,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: "25px",
                }}
              >
                Register
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center mt-3">
            <p style={{ color: "#ffffff" }}>Already have an account?</p>
            <Link
              to="/login"
              style={{
                color: accentColor,
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
