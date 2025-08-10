import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="footer py-5" style={{ backgroundColor: "#2f2f2f", color: "#fff" }}>
      <div className="container-fluid px-5">
        <div className="row">

          {/* About Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="mb-3" style={{ color: "#1ec6b6" }}>About Us</h4>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#ddd" }}>
              Welcome to <strong>BrickStore</strong>, your trusted destination for premium construction materials and home-building essentials! We deliver top-quality products for every stage of your building journey from durable bricks and cement to tiles, steel, and plumbing supplies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="mb-3" style={{ color: "#1ec6b6" }}>Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <NavLink to="/" className="text-light" style={{ textDecoration: "none", fontSize: "0.95rem" }}>
                  Home
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/about" className="text-light" style={{ textDecoration: "none", fontSize: "0.95rem" }}>
                  About
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/services" className="text-light" style={{ textDecoration: "none", fontSize: "0.95rem" }}>
                  Services
                </NavLink>

               
              </li>
              {/* <li className="mb-2">
                <NavLink to="/contact" className="text-light" style={{ textDecoration: "none", fontSize: "0.95rem" }}>
                  Contact
                </NavLink>
              </li> */}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="mb-3" style={{ color: "#1ec6b6" }}>Contact Us</h4>
            <ul className="list-unstyled" style={{ fontSize: "0.95rem", color: "#ddd" }}>
              <li>123 Main Street</li>
              <li>City, State, 12345</li>
              <li>Email: brickstore@gmail.com</li>
              <li>Phone: +123-456-7890</li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="d-flex justify-content-center mt-4">
          {[
            { icon: "facebook-f", bg: "#3b5998", url: "https://facebook.com" },
            { icon: "twitter", bg: "#55acee", url: "https://twitter.com" },
            { icon: "google", bg: "#dd4b39", url: "https://google.com" },
            { icon: "instagram", bg: "#ac2bac", url: "https://instagram.com" },
            { icon: "linkedin-in", bg: "#0082ca", url: "https://linkedin.com" },
            { icon: "github", bg: "#333333", url: "https://github.com" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm mx-2"
              style={{
                backgroundColor: item.bg,
                color: "white",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className={`fab fa-${item.icon}`}></i>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div
          className="text-center mt-4"
          style={{
            backgroundColor: "#1ec6b6",
            color: "white",
            padding: "10px",
            borderRadius: "6px",
            marginTop: "40px",
            fontWeight: "500",
            fontSize: "0.95rem",
          }}
        >
          © 2025 BrickStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
