import React, { useEffect, useState } from "react";
import { FaTachometerAlt, FaCalendarAlt, FaNotesMedical, FaPills, FaEnvelope, FaHeadset } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Patient.css";

const Patient = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Guest");
  const [email, setEmail] = useState("N/A");
  const [age, setAge] = useState("N/A");
  const [gender, setGender] = useState("N/A");
  const [activePage, setActivePage] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedAge = localStorage.getItem("age");
    const storedGender = localStorage.getItem("gender");

    if (storedName) setUsername(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedAge) setAge(storedAge);
    if (storedGender) setGender(storedGender);
  }, []);

  useEffect(() => {
    if (activePage === "dashboard") {
      setAppointments([
        { id: 1, doctor: "Dr. Smith", date: "2025-04-10", time: "10:00 AM" },
        { id: 2, doctor: "Dr. Johnson", date: "2025-04-12", time: "02:00 PM" }
      ]);
    }
  }, [activePage]);

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
        return <h2>Appointments Content</h2>;
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
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Patient;
