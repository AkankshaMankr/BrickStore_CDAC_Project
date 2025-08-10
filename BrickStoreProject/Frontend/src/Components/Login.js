import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import config from '../config';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    setSlideIn(true);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${config.API_URL}/login`, values);
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 1000,
        });

        const user = response.data;
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("userRole", user.role);
        sessionStorage.setItem("jwtToken", user.jwt);

        if (user.role === "ROLE_CUSTOMER") navigate("/");
        else if (user.role === "ROLE_ADMIN") navigate("/admin");
        else if (user.role === "ROLE_ENGINEER") navigate("/engineer");
      } catch (error) {
        toast.error("Invalid email or password!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    },
  });

  return (
    <div style={styles.loginBg}>
      <ToastContainer />
      <div
        style={{
          ...styles.loginContainer,
          transform: slideIn ? "translateY(0)" : "translateY(100vh)",
          opacity: slideIn ? 1 : 0,
          transition: "all 0.6s ease",
        }}
      >
        <h2 style={styles.title}>Login to BrickStore</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
              style={styles.input}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={styles.error}>{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
                style={{ ...styles.input, marginBottom: 0 }}
              />
              <span style={styles.icon} onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div style={styles.error}>{formik.errors.password}</div>
            )}
          </div>

          {/* Login Button */}
          <div style={styles.formGroup}>
            <button type="submit" style={styles.button}>
              Login
            </button>
          </div>
        </form>

        {/* Register */}
        <div style={{...styles.registerText, color:'#ffffff'}}>
          <p>Don't have an account?</p>
          <Link to="/register" style={styles.link}>
            <strong>Register here</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  loginBg: {
    backgroundColor: "#1a1f26", 
    opacity:"20",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  loginContainer: {
    backgroundColor: "#152336", 
    padding: "2rem",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 0 20px rgba(30, 198, 182, 0.3)",
    color: "#0a192f",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#1ec6b6",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#ffffff",
  },
  input: {
    width: "100%",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "1px solid #1ec6b6",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#0a192f",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    color: "#1ec6b6",
  },
  error: {
    color: "red",
    marginTop: "5px",
    fontSize: "0.875rem",
  },
  button: {
    backgroundColor: "#1ec6b6",
    color: "#ffffff",
    border: "none",
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  registerText: {
    color:'#ffffff',
    textAlign: "center",
    marginTop: "1.5rem",
    color: "#0a192f",
  },
  link: {
    color: "#1ec6b6",
    textDecoration: "none",
  },
};



export default Login;
