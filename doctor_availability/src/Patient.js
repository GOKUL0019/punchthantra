import React, { useEffect, useState } from "react";
import { FaTachometerAlt, FaCalendarAlt, FaNotesMedical, FaPills, FaEnvelope, FaHeadset } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Patient.css";

const Patient = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("name") || "Guest");
    setEmail(localStorage.getItem("email") || "N/A");
    setAge(localStorage.getItem("age") || "N/A");
    setGender(localStorage.getItem("gender") || "N/A");
  }, []);

  return (
    <div className="patient-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">MedConnect</h2>
        </div>
        <div className="sidebar-links">
          <ul>
            <li><button className="sidebar-link" onClick={() => navigate("/dashboard")}><FaTachometerAlt /> Dashboard</button></li>
            <li><button className="sidebar-link" onClick={() => navigate("/appointments")}><FaCalendarAlt /> Appointments</button></li>
            <li><button className="sidebar-link" onClick={() => navigate("/health-history")}><FaNotesMedical /> Health History</button></li>
            <li><button className="sidebar-link" onClick={() => navigate("/prescriptions")}><FaPills /> Prescriptions</button></li>
            <li><button className="sidebar-link" onClick={() => navigate("/messages")}><FaEnvelope /> Chat Bot</button></li>
            <li><button className="sidebar-link" onClick={() => navigate("/support")}><FaHeadset /> Support</button></li>
          </ul>
        </div>
      </div>

     
      <div className="main-content">
        <header className="patient-header">
          <h1 className="welcome-heading">Welcome, {username}!</h1>
          <p className="patient-description">You have successfully logged in as a patient.</p>
        </header>

        
        <div className="patient-dashboard">
          <section className="patient-profile">
            <h2 className="profile-heading">Your Profile</h2>
            <div className="profile-info">
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Age:</strong> {age}</p>
              <p><strong>Gender:</strong> {gender}</p>
              <p><strong>Medical ID:</strong> 123456789</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Patient;
