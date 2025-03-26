import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LucideHospital, LucideUser, LucideUserCog } from "lucide-react";
import { loginUser } from "../lib/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await loginUser(email, password, userType);
      if (success) {
        navigate(userType === "patient" ? "/patient/dashboard" : "/doctor/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <LucideHospital className="h-10 w-10 text-primary mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Login to MediQueue</h2>
          <p className="text-gray-500">Access your healthcare appointments</p>
        </div>
        <div className="mt-4">
          <div className="flex justify-center gap-4 mb-6">
            <button onClick={() => setUserType("patient")} className={`px-4 py-2 rounded ${userType === "patient" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              <LucideUser className="inline-block h-5 w-5 mr-2" /> Patient
            </button>
            <button onClick={() => setUserType("doctor")} className={`px-4 py-2 rounded ${userType === "doctor" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              <LucideUserCog className="inline-block h-5 w-5 mr-2" /> Doctor
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-lg" placeholder="your.email@example.com" />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
