import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Slides() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <ToastContainer />

      {/* Background Image */}
      <img
        src="./assests/frontPage.jpg"  
        alt="Background"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          opacity: "20%"
        }}
      />

      {/* Centered Text Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff"
        }}
      >
        {/* BrickStore Name */}
        <div style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "20px" }}>
          <span style={{ fontWeight: "300" }}>Brick</span>
          <span style={{ fontWeight: "700", color: "#1ec6b6" }}>Store</span>
        </div>

        {/* Portal Title */}
        <div style={{ fontSize: "2.5rem", fontWeight: "bold", textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}>
          Construction Manufacturing Portal
        </div>
      </div>
    </div>
  );
}

export default Slides;
