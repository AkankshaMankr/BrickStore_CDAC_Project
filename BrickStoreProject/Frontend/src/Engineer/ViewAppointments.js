import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Engineer from "./Engineer";

function ViewAppointmentsE() {
  const [appointments, setAppointments] = useState([]);
  const engineerId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (!sessionStorage.getItem("userName")) navigate("/");
    else if (role === "CUSTOMER") navigate("/customer");
    else if (role === "ADMIN") navigate("/admin");
  }, [navigate]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get(
          `http://localhost:5050/customer/getEngineerAppointments/${engineerId}`,
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

  const handleUpload = async (e, appointmentId) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `http://localhost:5050/engineer/uploadDocument/${appointmentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Document uploaded successfully!", { autoClose: 2500 });
      setTimeout(() => window.location.reload(), 2600);
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload document.", { autoClose: 2500 });
    }
  };

  return (
    <Engineer>
      <div
        style={{
          backgroundColor: "#0f172a", // Dark screen background
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <ToastContainer />
        <h2
          className="text-center mb-4"
          style={{ color: "#14b8a6", fontWeight: "bold" }}
        >
          Your Appointments
        </h2>

        <div
          style={{
            backgroundColor: "#0f172a", // Dark container background
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 0 15px rgba(0,0,0,0.4)",
          }}
        >
          <table
            className="table table-bordered table-hover"
            style={{
              minWidth: "1000px",
              backgroundColor: "#1e293b",
              color: "#f1f5f9",
              borderCollapse: "collapse",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead style={{ backgroundColor: "#1e293b", color: "#38bdf8" }}>
              <tr>
                <th>User Name</th>
                <th>Appointment Date</th>
                <th>Square Foot</th>
                <th>BHK</th>
                <th>Floor</th>
                <th>Land Description</th>
                <th>Status</th>
                <th> Quotation</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-light">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.appointmentDate + appt.userName}>
                    <td>{appt.userName}</td>
                    <td>{appt.appointmentDate}</td>
                    <td>{appt.sqft}</td>
                    <td>{appt.bhk}</td>
                    <td>{appt.floor}</td>
                    <td>{appt.landDescription}</td>
                    <td>{appt.status}</td>
                    <td>
                      {appt.status === "PENDING" ? (
                        <>
                          <label
                            htmlFor={`file-${appt.appointmentId}`}
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#14b8a6",
                              color: "#fff",
                              fontWeight: "600",
                              cursor: "pointer",
                              borderRadius: "6px",
                              padding: "6px 12px",
                            }}
                          >
                            Upload
                          </label>
                          <input
                            id={`file-${appt.appointmentId}`}
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleUpload(e, appt.appointmentId)
                            }
                          />
                        </>
                      ) : (
                        <span className="text-muted">Quotation Uploaded</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Engineer>
  );
}

export default ViewAppointmentsE;
