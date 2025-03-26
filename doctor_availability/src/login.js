import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function LoginRegister() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hospital, setHospital] = useState("");
  const [error, setError] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSpecialty("");
    setHospital("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");

    if (isLogin && userType === "patient") {
      navigate("/patient");
    } else {
      alert(isLogin ? "Logged in successfully!" : "Registered successfully!");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="app-title">MedConnect</h2>
      <div className="toggle-buttons">
        <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
          Register
        </button>
      </div>

      <div className="user-type-selector">
        <button className={userType === "patient" ? "active" : ""} onClick={() => setUserType("patient")}>
          Patient
        </button>
        <button className={userType === "doctor" ? "active" : ""} onClick={() => setUserType("doctor")}>
          Doctor
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {!isLogin && (
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
        )}

        {userType === "doctor" && !isLogin && (
          <>
            <div className="input-group">
              <label>Specialty</label>
              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} required>
                <option value="">Select Specialty</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Radiology">Radiology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Surgery">Surgery</option>
                <option value="Gastroenterology">Gastroenterology</option>
              </select>
            </div>
            <div className="input-group">
              <label>Hospital</label>
              <select value={hospital} onChange={(e) => setHospital(e.target.value)} required>
                <option value="">Select hospital</option>
                <option value="hospital1">Hospital 1</option>
                <option value="hospital2">Hospital 2</option>
                <option value="hospital3">Hospital 3</option>
              </select>
            </div>
          </>
        )}

        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="extra-options">
        {isLogin ? "New here?" : "Already have an account?"}{" "}
        <span onClick={handleToggle}>{isLogin ? "Sign up" : "Login"}</span>
      </p>
    </div>
  );
}
