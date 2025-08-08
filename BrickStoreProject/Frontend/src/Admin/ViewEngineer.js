import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewProducts"; 
import Admin from "./Admin";
import config from "../config";
function ViewEngineer() {
  const [engineers, setEngineers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
                else if (sessionStorage.getItem("userRole") === "ENGINEER") {
      navigate("/engineer");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const authconfig = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get(`${config.API_URL}/admin/getAllEngineers`, authconfig);
        setEngineers(response.data);
      } catch (error) {
        console.error("Error fetching vets:", error);
      }
    };

    fetchEngineers();
  }, []);

  const handleEdit = (id) => {
    if (id) {
      navigate(`/admin/editengineer/${id}`);
    } else {
      console.error("Engineer ID is undefined");
    }
  };

  return (
    <Admin>
      <div className="view-products-container">
        <h3>View Engineers</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Engineer Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Pincode</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {engineers.length > 0 ? (
              engineers.map((engineer) => (
                <tr key={engineer.id}>
                  <td>{engineer.userName}</td>
                  <td>{engineer.email}</td>
                  <td>{engineer.contact}</td>
                  <td>{engineer.pincode}</td>
                  <td>{engineer.address}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Engineers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewEngineer;
