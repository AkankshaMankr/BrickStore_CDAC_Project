import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";
import { useNavigate } from "react-router-dom";
import config from "../config";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const userId = sessionStorage.getItem("userId");
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
    async function fetchAppointments() {
      try {
        const response = await axios.get(
          `${config.API_URL}/customer/getAppointmentsByUserId/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
    fetchAppointments();
  }, []);

  const handleDownload = async (appointmentId) => {
    try {
      const response = await axios.get(
        `${config.API_URL}/customer/downloadDocument/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Construction_${appointmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Document downloaded successfully!");
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to download document.");
    }
  };

  const styles = {
    page: {
      backgroundColor: "#0a192f",
      minHeight: "100vh",
      padding: "2rem",
      color: "#fff",
    },
    heading: {
      color: "#1ec6b6",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "1.5rem",
    },
    table: {
      backgroundColor: "#152336",
      color: "#ffffff",
      borderCollapse: "collapse",
      width: "100%",
    },
    th: {
      backgroundColor: "#1ec6b6",
      color: "#0a192f",
      fontWeight: "bold",
    },
    td: {
      backgroundColor: "#1b2e4b",
      border: "1px solid #1ec6b6",
      verticalAlign: "middle",
      color: "#ffffff",  
    },
    
    evenRow: {
      backgroundColor: "#1f3a5c",
    },
    button: {
      backgroundColor: "#1ec6b6",
      border: "none",
      color: "#ffffff",
      padding: "4px 10px",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "500",
    },
    disabledBtn: {
      backgroundColor: "#ccc",
      color: "#333",
      cursor: "not-allowed",
    },
  };

  return (
    <div style={styles.page}>
      <ToastContainer />
      <h2 style={styles.heading}>Your Appointments</h2>

      <div className="table-responsive">
        <table className="table table-bordered" style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Engineer Name</th>
              <th style={styles.th}>Appointment Date</th>
              <th style={styles.th}>Square Foot (Area)</th>
              <th style={styles.th}>BHK</th>
              <th style={styles.th}>Floor</th>
              <th style={styles.th}>Land Description</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Download</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="8" style={styles.td} className="text-center">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appt, index) => (
                <tr key={appt.appointmentId}>
                  <td style={styles.td}>{appt.engineerName}</td>
                  <td style={styles.td}>{appt.appointmentDate}</td>
                  <td style={styles.td}>{appt.sqft}</td>
                  <td style={styles.td}>{appt.bhk}</td>
                  <td style={styles.td}>{appt.floor}</td>
                  <td style={styles.td}>{appt.landDescription}</td>
                  <td style={styles.td}>{appt.status}</td>
                  <td style={styles.td}>
                    <button
                      style={
                        appt.status === "COMPLETED"
                          ? styles.button
                          : { ...styles.button, ...styles.disabledBtn }
                      }
                      onClick={() => handleDownload(appt.appointmentId)}
                      disabled={appt.status !== "COMPLETED"}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAppointments;
