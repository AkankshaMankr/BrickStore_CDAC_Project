import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import EngineerNavbar from "./EngineerNavbar";

function Engineer({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    const name = sessionStorage.getItem("userName");

    if (!name) navigate("/");
    else if (role === "CUSTOMER") navigate("/customer");
    else if (role === "ADMIN") navigate("/admin");
    else if (role === "ENGINEER") navigate("/engineer");
  }, [navigate]);

  const styles = {
    layoutContainer: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#f8fafc", // Light background
    },
    sidebar: {
      width: "14%",
      backgroundColor: "#1f2937", // Dark gray sidebar
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
    },
    sidebarHeader: {
      padding: "20px 0",
      fontSize: "1.5rem",
      fontWeight: "bold",
      borderBottom: "1px solid #374151",
      textAlign: "center",
    },
    sidebarNav: {
      width: "100%",
      marginTop: "20px",
    },
    icon: {
      marginRight: "10px",
      fontSize: "1.5rem",
    },
    mainContent: {
      width: "100%",
      padding: "20px",
      backgroundColor: "#1f2937", 
      overflowY: "auto",
    },
  };

  return (
    <div>
      <EngineerNavbar />
      <div style={styles.layoutContainer}>
        <div style={styles.sidebar}>
          <div style={{...styles.sidebarHeader, color:'#1ec6b6'}}>Engineer</div>
          <nav style={styles.sidebarNav}>
            <NavLink
              to="/engineer/viewAppointments"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                padding: "15px 20px",
                textDecoration: "none",
                color: "#ffffff",
                fontSize: "1.1rem",
                backgroundColor: isActive ? "#14b8a6" : "transparent",
                fontWeight: isActive ? "bold" : "normal",
                transition: "0.3s",
                borderRadius: "6px",
                margin: "8px 12px",
              })}
            >
              <MdCategory style={styles.icon} />
              View Appointments
            </NavLink>
          </nav>
        </div>

        <div style={styles.mainContent}>{children}</div>
      </div>
    </div>
  );
}

export default Engineer;
