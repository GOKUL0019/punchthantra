import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function LoginRegister() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [specialty, setSpecialty] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [error, setError] = useState("");

  const specialties = ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Radiology"];
  const hospitals = ["City Hospital", "Green Valley Hospital", "Sunrise Medical Center", "Metro Healthcare"];

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setName("");
    setEmail("");
    setAge("");
    setGender("");
    setPassword("");
    setConfirmPassword("");
    setSpecialty([]);
    setHospital([]);
  };

  const handleSpecialtyChange = (selected) => {
    setSpecialty((prev) => 
      prev.includes(selected) ? prev.filter((s) => s !== selected) : [...prev, selected]
    );
  };

  const handleHospitalChange = (selected) => {
    setHospital((prev) => 
      prev.includes(selected) ? prev.filter((h) => h !== selected) : [...prev, selected]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");

    if (!isLogin && userType === "patient") {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("age", age);
      localStorage.setItem("gender", gender);
    }

    if (isLogin && userType === "patient") {
      navigate("/patient");
    }else if (isLogin && userType === "doctor"){
      navigate("/doctor");
    } 
    else {
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
          <label>Name</label>
          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        {userType === "patient" && !isLogin && (
          <>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="input-group">
              <label>Age</label>
              <input type="number" placeholder="Your Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </>
        )}

{userType === "doctor" && !isLogin && (
          <>
            <div className="input-group">
              <label>Specialty</label>
              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} style={{ color: 'grey' }}>
                <option value="">Select Specialty</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Hospital</label>
              <select value={hospital} onChange={(e) => setHospital(e.target.value)} style={{ color: 'grey' }}>
                <option value="">Select Hospital</option>
                {hospitals.map((hosp) => (
                  <option key={hosp} value={hosp}>{hosp}</option>
                ))}
              </select>
            </div>
          </>
        )}

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

        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="extra-options">
        {isLogin ? "New here?" : "Already have an account?"} <span onClick={handleToggle}>{isLogin ? "Sign up" : "Login"}</span>
      </p>
    </div>

  );
}
