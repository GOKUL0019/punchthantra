import React from 'react';
import './Patient.css';

const Patient = () => {
  return (
    <div className="patient-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">MedConnect</h2>
        </div>
        <div className="sidebar-links">
          <ul>
            <li><button className="sidebar-link">Home</button></li>
            <li><button className="sidebar-link">Appointments</button></li>
            <li><button className="sidebar-link">Health History</button></li>
            <li><button className="sidebar-link">Prescriptions</button></li>
            <li><button className="sidebar-link">Messages</button></li>
            <li><button className="sidebar-link">Support</button></li>
          </ul>
        </div>
      </div>
      
      <div className="main-content">
        <header className="patient-header">
          <h1 className="welcome-heading">Welcome, Patient!</h1>
          <p className="patient-description">You have successfully logged in as a patient.</p>
        </header>
        
        <div className="patient-dashboard">
          <section className="patient-profile">
            <h2 className="profile-heading">Your Profile</h2>
            <div className="profile-info">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Age:</strong> 30</p>
              <p><strong>Gender:</strong> Male</p>
              <p><strong>Medical ID:</strong> 123456789</p>
            </div>
          </section>
          
          <section className="patient-appointments">
            <h2 className="appointments-heading">Upcoming Appointments</h2>
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dr. Smith</td>
                  <td>2025-04-10</td>
                  <td>10:00 AM</td>
                  <td>Hospital 1</td>
                </tr>
                <tr>
                  <td>Dr. Johnson</td>
                  <td>2025-04-12</td>
                  <td>2:30 PM</td>
                  <td>Hospital 2</td>
                </tr>
              </tbody>
            </table>
          </section>
          
          <section className="health-tips">
            <h2 className="health-tips-heading">Health Tips</h2>
            <ul className="health-tips-list">
              <li>Eat a balanced diet rich in vegetables and fruits.</li>
              <li>Exercise regularly to improve your cardiovascular health.</li>
              <li>Stay hydrated by drinking plenty of water throughout the day.</li>
              <li>Get at least 8 hours of sleep every night.</li>
            </ul>
          </section>
        </div>
        
        <div className="patient-actions">
          <button className="btn-action">Schedule New Appointment</button>
          <button className="btn-action">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Patient;
