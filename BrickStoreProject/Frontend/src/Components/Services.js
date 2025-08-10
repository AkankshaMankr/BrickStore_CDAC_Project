
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Services() {
  const services = [
    {
      title: "Consultation & Planning",
      description:
        "Connect with professional engineers to plan your construction project. We offer expert advice tailored to your space, budget, and needs.",
    },
    {
      title: "On-Site Inspection",
      description:
        "Our engineers provide detailed site inspections to ensure project feasibility, safety, and adherence to structural guidelines.",
    },
    {
      title: "Digital Documentation",
      description:
        "Upload, share, and store important construction documents securely, including plans, permits, and reports.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        padding: "40px 20px",
        color: "#f1f5f9",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#14b8a6", fontWeight: "bold", marginBottom: "40px" }}>
          Our Services
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#1e293b",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <h3 style={{ color: "#14b8a6", marginBottom: "15px" }}>{service.title}</h3>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
                {service.description}
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
