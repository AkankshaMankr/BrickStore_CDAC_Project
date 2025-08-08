import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaCreditCard,
  FaUserMd,
  FaQuestionCircle
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { GrPlan } from "react-icons/gr";
import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    const user = sessionStorage.getItem("userName");
    if (!user) {
      navigate("/");
    } else if (role === "CUSTOMER") {
      navigate("/customer");
    } else if (role === "ENGINEER") {
      navigate("/engineer");
    }
  }, [navigate]);

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <AdminNavbar />
      <div className="layout-container" style={{ display: "flex" }}>
        {/* Sidebar */}
        <div
          className="sidebar"
          style={{
            width: "230px",
            backgroundColor: "#1e1e2f",
            color: "#fff",
            padding: "20px 15px",
            boxShadow: "2px 0 8px rgba(0,0,0,0.5)",
          }}
        >
          <div className="sidebar-header" style={{ marginBottom: "25px" }}>
            <h3 style={{ color: "#1ec6b6", textAlign: "center" }}>Admin</h3>
          </div>

          <nav className="sidebar-nav" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <SidebarLink to="/admin/addcategory" icon={<MdCategory />} label="Category" />
            <SidebarLink to="/admin/addproducts" icon={<FaPlus />} label="Add Products" />
            <SidebarLink to="/admin/addengineer" icon={<FaUserMd />} label="Add Engineer" />
            <SidebarLink to="/admin/viewproducts" icon={<AiOutlineEye />} label="View Products" />
            <SidebarLink to="/admin/viewengineers" icon={<FaUserMd />} label="View Engineers" />
            <SidebarLink to="/admin/vieworders" icon={<GrPlan />} label="Orders" />
            <SidebarLink to="/admin/viewPayments" icon={<FaCreditCard />} label="Payment" />
            <SidebarLink to="/admin/questionAndAnswer" icon={<FaQuestionCircle />} label="Help" />
          </nav>
        </div>

        {/* Main content */}
        <div
          className="main-content"
          style={{
            flex: 1,
            padding: "30px",
            backgroundColor: "#1c1c2e",
            color: "#fff",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// Reusable sidebar link
function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "sidebar-link active" : "sidebar-link"
      }
    >
      <span className="icon">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

export default Admin;
