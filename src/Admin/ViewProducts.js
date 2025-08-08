import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewProducts.css";
import Admin from "./Admin";
import config from "../config";
function ViewProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    } else if (sessionStorage.getItem("userRole") === "ENGINEER") {
      navigate("/engineer");
    }
  }, [navigate]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const authconfig = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const response = await axios.get(`${config.API_URL}/admin/getAllProducts`, authconfig);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (id) => {
    if (id) {
      navigate(`/admin/editproduct/${id}`);
    } else {
      console.error("Product ID is undefined");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const authconfig = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      await axios.delete(`${config.API_URL}/admin/deleteProduct/${id}`, authconfig);
      alert("Product deleted successfully");
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <Admin>
      <div className="view-products-container">
      <h3 className="view-products-heading">View Products</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.categoryName}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(product.productId)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    {/* <button
                      onClick={() => handleDelete(product.productId)}
                      className="delete-btn"
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewProducts;
