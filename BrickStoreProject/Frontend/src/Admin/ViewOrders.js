import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewOrders.css";
import Admin from "./Admin";
import config from "../config";
function ViewOrders() {
  const [orders, setOrders] = useState([]);
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
    const fetchOrders = async () => {
      try {
        const authconfig = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get(
          `${config.API_URL}/admin/getAllOrders`,
          authconfig
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Group orders by orderId
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.orderId]) {
      acc[order.orderId] = {
        orderId: order.orderId,
        orderDate: order.orderDate,
        userName: order.userName,
        products: [],
      };
    }

    acc[order.orderId].products.push({
      productName: order.productName,
      quantity: order.quantity,
    });

    return acc;
  }, {});

  const groupedOrdersArray = Object.values(groupedOrders);

  return (
    <Admin>
      <div className="view-orders-container">
        <h2>View Orders</h2>
        <div className="orders-box">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>User Name</th>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {groupedOrdersArray.length > 0 ? (
                groupedOrdersArray.map((order) => (
                  <React.Fragment key={order.orderId}>
                    {order.products.map((product, index) => (
                      <tr key={index}>
                        {index === 0 && (
                          <>
                            <td rowSpan={order.products.length}>
                              {order.orderId}
                            </td>
                            <td rowSpan={order.products.length}>
                              {order.orderDate}
                            </td>
                            <td rowSpan={order.products.length}>
                              {order.userName}
                            </td>
                          </>
                        )}
                        <td>{product.productName}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No orders available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
}

export default ViewOrders;
