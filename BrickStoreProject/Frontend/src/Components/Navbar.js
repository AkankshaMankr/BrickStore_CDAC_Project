import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCartFill } from "react-icons/bs";

function Navbar({ cartCount }) {
  const userId = 1;

  const navStyle = {
    backgroundColor: "#1a1a1a",
    padding: "1rem 2rem",
  };

  const brandStyle = {
    color: "#1ec6b6",
    fontWeight: "bold",
    fontSize: "1.6rem",
    textDecoration: "none",
  };

  const navLinkStyle = {
    color: "#fff",
    fontSize: "1.1rem",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    transition: "0.3s",
  };

  const navLinkHover = {
    backgroundColor: "#1ec6b6",
    color: "#000",
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={navStyle}>
      <div className="container-fluid">
       
        <NavLink className="navbar-brand d-flex align-items-center" to="/" style={brandStyle}>
          <span style={{ fontWeight: "300", color: "#fff" }}>Real</span>
          <span style={{ fontWeight: "700", color: "#1ec6b6" }}>Estate</span>
        </NavLink>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            {["About", "Login", "Register"].map((text, idx) => (
              <li className="nav-item" key={idx}>
                <NavLink
                  to={`/${text.toLowerCase()}`}
                  className="nav-link fw-semibold"
                  style={navLinkStyle}
                  onMouseEnter={(e) => Object.assign(e.target.style, navLinkHover)}
                  onMouseLeave={(e) => Object.assign(e.target.style, navLinkStyle)}
                >
                  {text}
                </NavLink>
              </li>
            ))}

            {/* Cart Icon */}
            <li className="nav-item">
              <NavLink
                className="nav-link fw-semibold position-relative"
                to={`/viewcart/${userId}`}
                style={navLinkStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, navLinkHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, navLinkStyle)}
              >
                <BsCartFill size={20} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
