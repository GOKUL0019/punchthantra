import React, { useState } from "react";
import './doctor.css';
export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Doe", time: "10:00 AM", status: "Pending" },
    { id: 2, patient: "Jane Smith", time: "11:30 AM", status: "Confirmed" },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: "Admin", content: "New policy update available" },
  ]);

  return (
    <div>
      <h1>Welcome to the Doctor Dashboard</h1>
      <p>Manage appointments, view patient details, and update medical records.</p>

      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.time} - {appointment.patient} ({appointment.status})
          </li>
        ))}
      </ul>

      <h2>Patient Records</h2>
      <p>Access patient history, prescriptions, and diagnostic reports.</p>

      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.sender}: {message.content}</li>
        ))}
      </ul>

      <h2>Settings</h2>
      <p>Manage profile, availability, and notifications.</p>
    </div>
  );
};