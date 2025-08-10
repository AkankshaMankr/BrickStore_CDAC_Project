import React from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Section1() {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Login to book appointment", { autoClose: 2500 });
    } else {
      navigate('/bookappointment');
    }
  };

  const styles = {
    heroSection: {
      backgroundColor: "#f8f9fa",
      padding: "80px 0",
    },
    heading: {
      fontSize: "2.4rem",
      fontWeight: "700",
      lineHeight: "1.3",
      color: "#000",
    },
    tagline: {
      textTransform: "uppercase",
      color: "#1ec6b6",
      fontWeight: "600",
      fontSize: "1.5rem",
      letterSpacing: "1px",
      marginBottom: "10px",
    },
    lead: {
      fontSize: "1.2rem",
      color: "#555",
      marginBottom: "25px",
      maxWidth: "500px",
    },
    brandHighlight: {
      color: "#1ec6b6",
    },
    button: {
      backgroundColor: "#1ec6b6",
      border: "none",
      color: "#fff",
      padding: "7px 30%",
      fontSize: "2.5rem",
      borderRadius: "20px",
      transition: "background-color 0.3s ease",
      display: "inline-block",
      marginTop: "10px",
      fontFamily:"serif", 
    }
    
    
    ,
    imageWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "150%",
    },
    image: {
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      width: "90%", 
      maxWidth: "700px", 
    },
  };

  return (
    <div style={styles.heroSection}>
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "400px" }}>

          {/* Text Area */}
          <div className="col-lg-6 col-12 d-flex flex-column justify-content-center px-5">
            <h6 style={styles.tagline}>Your Trusted Partner</h6>
            <h1 style={styles.heading}>
              Build Your Dream Home with <span style={styles.brandHighlight}>BrickStore</span>
            </h1>
            <p style={styles.lead}>
              BrickStore provides high-quality construction materials from bricks, cement, steel to tiles, plumbing, and electrical supplies. We're here to simplify
              your home-building process with expert guidance and trusted vendors.
            </p>
            <button
              style={styles.button}
              onClick={handleBookAppointment}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#169d93")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1ec6b6")}
            >
             <b>Book Appointment</b>
            </button>
          </div>

          {/* Image Area */}
          <div className="col-lg-6 col-12" style={styles.imageWrapper}>
            <img
              src="./assests/img1.jpeg"
              alt="BrickStore"
              style={styles.image}
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
