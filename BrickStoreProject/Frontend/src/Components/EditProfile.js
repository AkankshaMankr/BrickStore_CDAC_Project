import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import config from "../config";
function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate]);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const editUrl = `${config.API_URL}/customer/getUserById/${id}`;
  const updateUrl = `${config.API_URL}/customer/updateUser/${id}`;

  useEffect(() => {
    const authconfig = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, authconfig)
      .then((response) => {
        const { userName, email, contact, pincode, address } = response.data;
        setUserName(userName || "");
        setEmail(email || "");
        setContact(contact || "");
        setPincode(pincode || "");
        setAddress(address || "");
        setPassword(""); 
      })
      .catch((error) => {
        console.error("Error occurred getting user details:", error);
        toast.error("Failed to fetch user details");
      });
  }, [editUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const authconfig = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    const userDetails = {
      userName,
      email,
      contact,
      pincode,
      address,
      password, 
    };

    axios
      .put(updateUrl, userDetails, authconfig)
      .then(() => {
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div style={{ backgroundColor: "#0a192f", minHeight: "100vh", paddingTop: "5%" }}>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            backgroundColor: "#112240",
            color: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #1ec6b6",
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.2)",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#1ec6b6" }}>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>User Name:</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{
                  height: "35px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "1px solid #1ec6b6",
                }}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  height: "35px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "1px solid #1ec6b6",
                }}
                required
              />
            </div>

            <div className="mb-3">
              <label>Contact:</label>
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={10}
                pattern="\d{10}"
                style={{
                  height: "35px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "1px solid #1ec6b6",
                }}
                required
              />
            </div>

            <div className="mb-3">
              <label>Pincode:</label>
              <input
                type="text"
                className="form-control"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
                pattern="\d{6}"
                style={{
                  height: "35px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "1px solid #1ec6b6",
                }}
                required
              />
            </div>

            <div className="mb-3">
              <label>Address:</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  height: "80px",
                  backgroundColor: "#0f172a",
                  color: "#fff",
                  border: "1px solid #1ec6b6",
                }}
                required
              />
            </div>

           
            <div className="mb-3">
              <label>Password:</label>
              <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{
                    height: "35px",
                    paddingRight: "35px",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    border: "1px solid #1ec6b6",
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    cursor: "pointer",
                    color: "#1ec6b6",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {password && password.length < 6 && (
                <div className="text-danger">Password must be at least 6 characters.</div>
              )}
            </div>

            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn w-100"
                style={{
                  background: " #1ec6b6",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  height: "40px",
                }}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
