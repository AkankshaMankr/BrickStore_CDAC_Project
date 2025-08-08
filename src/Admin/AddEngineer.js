import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddEngineer.css";
import Admin from "./Admin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import config from "../config";
function AddEngineer() {
  const [engineerName, setEngineerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (!sessionStorage.getItem("userName")) navigate("/");
    else if (role === "CUSTOMER") navigate("/customer");
    else if (role === "ENGINEER") navigate("/engineer");
    else if (role === "ADMIN") navigate("/admin");
  }, [navigate]);

  const validateForm = () => {
    if (!engineerName || !email || !address || !pincode || !contact || !password) {
      setError("All fields are required.");
      return false;
    }
  
    // Name validation: First Last (with only alphabets, space between)
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
    if (!nameRegex.test(engineerName)) {
      setError("Name must be in 'First Last' format using only letters.");
      return false;
    }
  
    // Email validation: no special chars, can contain digits, must end with @gmail.com
    const emailRegex = /^[A-Za-z][A-Za-z0-9]*@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError("Email must start with letters, contain only letters/numbers, and end with @gmail.com.");
      return false;
    }
  
    // Contact: exactly 10 digits, no + or special chars, and not starting with 00
    const contactRegex = /^(?!00)\d{10}$/;
    if (!contactRegex.test(contact)) {
      setError("Contact must be a 10-digit number not starting with 00 or special characters.");
      return false;
    }
  
    // Pincode: 6 digit number only, between 100000 and 999999
    const pinRegex = /^\d{6}$/;
    const pin = parseInt(pincode, 10);
    if (!pinRegex.test(pincode) || pin < 100000 || pin > 999999) {
      setError("Pincode must be a valid 6-digit number in the range 100000 to 999999.");
      return false;
    }
  
    // Password: already correct – keep as is
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters with a letter and a number.");
      return false;
    }
  
    setError("");
    return true;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const engineerData = {
      userName: engineerName,
      email,
      address,
      pincode,
      contact,
      password,
    };

    try {
      const authconfig = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const response = await axios.post(
        `${config.API_URL}/admin/registerEngineer`,
        engineerData,
        authconfig
      );

      if (response.status === 201) {
        alert("Engineer added successfully!");
        setEngineerName("");
        setEmail("");
        setAddress("");
        setPincode("");
        setContact("");
        setPassword("");
        setError("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add engineer. Please try again.");
    }
  };

  return (
    <Admin>
      <div className="add-product-container">
        <h3>Add New Engineer</h3>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Engineer Name</label>
            <input
              type="text"
              value={engineerName}
              onChange={(e) => setEngineerName(e.target.value)}
              placeholder="Enter engineer's name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter 6-digit pincode"
              maxLength="6"
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <span
                style={{ marginLeft: "-30px", cursor: "pointer" }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default AddEngineer;
