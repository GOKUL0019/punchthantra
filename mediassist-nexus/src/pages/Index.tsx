
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import PatientSignup from '@/components/PatientSignup';
import DoctorSignup from '@/components/DoctorSignup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>('patient');
  const [showLogin, setShowLogin] = useState<boolean>(true);

  // Toggle between login and signup forms
  const toggleForm = () => {
    setShowLogin(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="section-container flex-1 flex flex-col justify-center items-center py-10">
        <div className="w-full max-w-4xl animate-fade-in">
          <div className="text-center mb-10">
            <Logo size="lg" className="mb-4 inline-block" />
            <h1 className="text-3xl font-bold mb-2">Welcome to HealthSync</h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Your comprehensive healthcare platform for seamless doctor-patient connections
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - Patient Login/Signup */}
            <div className="auth-card">
              <Tabs defaultValue="patient" onValueChange={value => setActiveTab(value)}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="patient">Patient Portal</TabsTrigger>
                  <TabsTrigger value="doctor">Doctor Portal</TabsTrigger>
                </TabsList>
                
                <TabsContent value="patient" className="animate-fade-in">
                  {activeTab === 'patient' && (
                    showLogin ? (
                      <LoginForm
                        userType="patient"
                        onToggleSignup={toggleForm}
                      />
                    ) : (
                      <PatientSignup
                        onToggleLogin={toggleForm}
                      />
                    )
                  )}
                </TabsContent>
                
                <TabsContent value="doctor" className="animate-fade-in">
                  {activeTab === 'doctor' && (
                    showLogin ? (
                      <LoginForm
                        userType="doctor"
                        onToggleSignup={toggleForm}
                      />
                    ) : (
                      <DoctorSignup
                        onToggleLogin={toggleForm}
                      />
                    )
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right side - Information */}
            <div className="glass-card p-8 bg-medical-dark text-white">
              <h2 className="text-2xl font-semibold mb-6">
                {activeTab === 'patient' ? 'For Patients' : 'For Doctors'}
              </h2>
              
              {activeTab === 'patient' ? (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-medical-primary text-medical-dark mr-3">
                      ✓
                    </div>
                    <p>Book appointments with doctors nearby</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-medical-primary text-medical-dark mr-3">
                      ✓
                    </div>
                    <p>Check your token status and estimated wait time</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-medical-primary text-medical-dark mr-3">
                      ✓
                    </div>
                    <p>Access your health history and prescriptions</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-medical-primary text-medical-dark mr-3">
                      ✓
                    </div>
                    <p>Get quick health insights through our AI chatbot</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-medical-primary text-medical-dark mr-3">
                      ✓
                    </div>
                    <p>Manage patient appointments efficiently</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-medical-primary text-medical-dark mr-3">
                      ✓
                    </div>
                    <p>Update prescriptions and patient records</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-medical-primary text-medical-dark mr-3">
                      ✓
                    </div>
                    <p>Track patient history and provide better care</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-medical-primary text-medical-dark mr-3">
                      ✓
                    </div>
                    <p>Connect with patients through secure messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} HealthSync. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
