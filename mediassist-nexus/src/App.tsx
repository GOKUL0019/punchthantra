
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Appointments from "./pages/Appointments";
import HealthHistory from "./pages/HealthHistory";
import Prescriptions from "./pages/Prescriptions";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorPrescriptions from "./pages/DoctorPrescriptions";
import PatientChat from "./pages/PatientChat";
import DoctorSettings from "./pages/DoctorSettings";


const Chatbot = () => <div>Chatbot Page</div>;
const Support = () => <div>Support Page</div>;
const DoctorPatients = () => <div>Doctor Patients Page</div>;

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, userType }: { children: JSX.Element, userType: string }) => {
  const currentUserType = localStorage.getItem('userType');
  
  if (!currentUserType) {
    return <Navigate to="/" replace />;
  }
  
  if (userType && currentUserType !== userType) {
    return currentUserType === 'patient' 
      ? <Navigate to="/patient-dashboard" replace />
      : <Navigate to="/doctor-dashboard" replace />;
  }
  
  return children;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-medical-light">
        <div className="text-center">
          <div className="inline-block animate-pulse">
            <span className="text-3xl font-bold">
              <span className="text-medical-dark">Health</span>
              <span className="text-medical-primary">Sync</span>
            </span>
          </div>
          <div className="mt-4 h-1 w-24 mx-auto bg-gray-200 rounded">
            <div className="h-1 bg-medical-primary rounded animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Patient Routes */}
            <Route 
              path="/patient-dashboard" 
              element={
                <ProtectedRoute userType="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/appointments" 
              element={
                <ProtectedRoute userType="patient">
                  <Appointments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/health-history" 
              element={
                <ProtectedRoute userType="patient">
                  <HealthHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/prescriptions" 
              element={
                <ProtectedRoute userType="patient">
                  <Prescriptions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chatbot" 
              element={
                <ProtectedRoute userType="patient">
                  <Chatbot />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/support" 
              element={
                <ProtectedRoute userType="patient">
                  <Support />
                </ProtectedRoute>
              } 
            />
            
            {/* Doctor Routes */}
            <Route 
              path="/doctor-dashboard" 
              element={
                <ProtectedRoute userType="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-patients" 
              element={
                <ProtectedRoute userType="doctor">
                  <DoctorPatients />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-appointments" 
              element={
                <ProtectedRoute userType="doctor">
                  <DoctorAppointments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-prescriptions" 
              element={
                <ProtectedRoute userType="doctor">
                  <DoctorPrescriptions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-chat" 
              element={
                <ProtectedRoute userType="doctor">
                  <PatientChat />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-settings" 
              element={
                <ProtectedRoute userType="doctor">
                  <DoctorSettings />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
