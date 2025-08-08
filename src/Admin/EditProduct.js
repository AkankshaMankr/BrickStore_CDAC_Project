import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

import config from '../config';


function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const editUrl = `${config.API_URL}/admin/product/${id}`;
  const updateUrl = `${config.API_URL}/admin/updateProduct/${id}`;
  const deleteUrl = `${config.API_URL}/admin/deleteProduct/${id}`;

  const authconfig = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

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

  useEffect(() => {
    axios
      .get(editUrl, authconfig)
      .then((response) => {
        const { productName, price, quantity } = response.data;
        setProductName(productName);
        setPrice(price);
        setQuantity(quantity);
      })
      .catch((error) => {
        console.error("Error occurred getting product details:", error);
        toast.error("Failed to fetch product details");
      });
  }, [editUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productUpdateDTO = { price, quantity };

    axios
      .put(updateUrl, productUpdateDTO, authconfig)
      .then(() => {
        toast.success("Product updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewproducts");
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to update product:", error);
        toast.error("Failed to update product.");
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    axios
      .delete(deleteUrl, authconfig)
      .then(() => {
        toast.success("Product deleted successfully!");
        setTimeout(() => {
          navigate("/admin/viewproducts");
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to delete product:", error);
        toast.error("Failed to delete product.");
      });
  };

  // Internal CSS Styles
  const containerStyle = {
    backgroundColor: "#0a192f",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#112240",
    color: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1ec6b6",
    fontWeight: "bold",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "15px",
    fontWeight: "500",
    color: "#ffffff",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    color: "#000000",
    boxSizing: "border-box",
    marginBottom: "20px",
  };

  const readOnlyInputStyle = {
    ...inputStyle,
    backgroundColor: "#e9ecef",
    color: "#555",
  };

  const buttonStyle = {
    padding: "10px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "none",
    width: "100%",
    cursor: "pointer",
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#1ec6b6",
    color: "#0a192f",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    color: "white",
  };

  const gapStyle = {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
  };

  return (
    <Admin>
      <ToastContainer />
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={headingStyle}>Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label style={labelStyle}>Product Name:</label>
              <input
                type="text"
                value={productName}
                readOnly
                style={readOnlyInputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div style={gapStyle}>
              <button type="submit" style={saveButtonStyle}>
                Save Changes
              </button>
              {/* <button
                type="button"
                style={deleteButtonStyle}
                onClick={handleDelete}
              >
                Delete Product
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default EditProduct;
