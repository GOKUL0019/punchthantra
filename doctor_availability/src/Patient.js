import React, { useEffect, useState } from "react";
import { FaTachometerAlt, FaCalendarAlt, FaNotesMedical, FaPills, FaEnvelope, FaHeadset, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Patient.css";

const Patient = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Guest",
    email: "N/A",
    age: "N/A",
    gender: "N/A",
  });
  const [activePage, setActivePage] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const updateUserDetails = () => {
      setUser({
        name: localStorage.getItem("name") || "Guest",
        email: localStorage.getItem("email") || "N/A",
        age: localStorage.getItem("age") || "N/A",
        gender: localStorage.getItem("gender") || "N/A",
      });
    };
  
    updateUserDetails();
  
    window.addEventListener("storage", updateUserDetails);
  
    return () => {
      window.removeEventListener("storage", updateUserDetails);
    };
  }, []);
  
  useEffect(() => {
    if (activePage === "dashboard") {
      setAppointments([
        { id: 1, doctor: "Dr. Smith", date: "2025-04-10", time: "10:00 AM" },
        { id: 2, doctor: "Dr. Johnson", date: "2025-04-12", time: "02:00 PM" },
      ]);
    }
  }, [activePage]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div>
            <h2>Your Appointments</h2>
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  {appointment.date} at {appointment.time} with {appointment.doctor}
                </li>
              ))}
            </ul>
          </div>
        );
      case "appointments":
        return (
          <div>
            <h2>Apply for an Appointment</h2>
            <p>Here you can schedule new appointments with doctors.</p>
          </div>
        );
      case "health-history":
        return <h2>Health History Content</h2>;
      case "prescriptions":
        return <h2>Prescriptions Content</h2>;
      case "messages":
        return <h2>Chat Bot Content</h2>;
      case "support":
        return <h2>Support Content</h2>;
      default:
        return <h2>Dashboard Content</h2>;
    }
  };

  return (
    <div className="patient-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">MedConnect</h2>
        </div>
        <div className="sidebar-links">
          <ul>
            <li><button className="sidebar-link" onClick={() => setActivePage("dashboard")}><FaTachometerAlt /> Dashboard</button></li>
            <li><button className="sidebar-link" onClick={() => setActivePage("appointments")}><FaCalendarAlt /> Appointments</button></li>
            <li><button className="sidebar-link" onClick={() => setActivePage("health-history")}><FaNotesMedical /> Health History</button></li>
            <li><button className="sidebar-link" onClick={() => setActivePage("prescriptions")}><FaPills /> Prescriptions</button></li>
            <li><button className="sidebar-link" onClick={() => setActivePage("messages")}><FaEnvelope /> Chat Bot</button></li>
            <li><button className="sidebar-link" onClick={() => setActivePage("support")}><FaHeadset /> Support</button></li>
          </ul>
        </div>
      </div>
      
      <div className="main-content">
        <header className="patient-header">
          <h1 className="welcome-heading">Welcome, {user.name}!</h1>
          <p className="patient-description">You have successfully logged in as a patient.</p>
    
          <div className="profile-section">
            <FaUserCircle className="profile-icon" />
            <span className="profile-name">{user.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </header>

        <div className="patient-dashboard">
          <section className="patient-profile">
            <h2 className="profile-heading">Your Profile</h2>
            <div className="profile-info">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Medical ID:</strong> 123456789</p>
            </div>
          </section>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Patient;