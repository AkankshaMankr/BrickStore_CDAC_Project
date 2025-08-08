import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Admin from "./Admin";
import "./AddCategory.css";
import config from "../config";
function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    const name = sessionStorage.getItem("userName");

    if (!name) {
      navigate("/");
    } else if (role === "CUSTOMER") {
      navigate("/customer");
    } else if (role === "ENGINEER") {
      navigate("/engineer");
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!categoryName || !categoryImage) {
      setError("Both fields are required.");
      return;
    }
  
    // Check if the first letter is capital
    const firstChar = categoryName.charAt(0);
    if (firstChar !== firstChar.toUpperCase()) {
      setError("The first letter of the category name must be capital.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);
  
    try {
      const authconfig = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "multipart/form-data",
        },
      };
  
      const response = await axios.post(
        `${config.API_URL}/admin/addCategory`,
        formData,
        authconfig
      );
  
      if (response.status === 201) {
        alert("Category added successfully!");
        setCategoryName("");
        setCategoryImage(null);
        setError("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add category. Please try again.");
    }
  };
  

  return (
    <Admin>
      <div className="category-container">
        <div className="category-form-card">
          <h3 className="category-heading">Add New Category</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={handleNameChange}
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryImage">Category Image</label>
              <input
                type="file"
                id="categoryImage"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default AddCategory;
