
import React, { useEffect, useState } from 'react';
import PatientSidebar from '@/components/PatientSidebar';
import AppointmentCard, { AppointmentData } from '@/components/AppointmentCard';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarClock, UserCog, Bell } from 'lucide-react';

const SAMPLE_APPOINTMENTS: AppointmentData[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    hospitalName: 'City General Hospital',
    date: 'Today',
    time: '10:00 AM',
    tokenNumber: 12,
    currentToken: 10,
    status: 'active',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    hospitalName: 'Memorial Medical Center',
    date: 'Tomorrow',
    time: '2:30 PM',
    tokenNumber: 8,
    currentToken: 0,
    status: 'upcoming',
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Rodriguez',
    hospitalName: 'Central Health Clinic',
    date: '15 June, 2023',
    time: '11:15 AM',
    tokenNumber: 5,
    currentToken: 5,
    status: 'completed',
  },
];

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const patientData = localStorage.getItem('patientData');
    if (patientData) {
      setUserData(JSON.parse(patientData));
    }
    
    // Simulate loading appointments
    setTimeout(() => {
      setAppointments(SAMPLE_APPOINTMENTS);
      setLoading(false);
    }, 1000);
    
    // Simulate token number increasing
    const intervalId = setInterval(() => {
      setAppointments(prev => 
        prev.map(app => {
          if (app.status === 'active' && app.currentToken < app.tokenNumber) {
            return {
              ...app,
              currentToken: app.currentToken + 1
            };
          }
          return app;
        })
      );
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  const activeAppointment = appointments.find(app => app.status === 'active');
  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');

  return (
    <div className="flex h-screen bg-gray-50">
      <PatientSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {userData?.name || 'Patient'}</h1>
            <p className="text-gray-600">Here's an overview of your health activity</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="animated-card">
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 bg-medical-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <CalendarClock className="h-6 w-6 text-medical-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Upcoming Appointments</p>
                  <p className="text-2xl font-semibold">{upcomingAppointments.length}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animated-card">
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <UserCog className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Consultations</p>
                  <p className="text-2xl font-semibold">{activeAppointment ? 1 : 0}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animated-card">
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <Bell className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Notifications</p>
                  <p className="text-2xl font-semibold">3</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Active Appointment</h2>
            {loading ? (
              <div className="h-48 animate-pulse bg-gray-200 rounded-xl"></div>
            ) : activeAppointment ? (
              <AppointmentCard appointment={activeAppointment} />
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No active appointments</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            {loading ? (
              <div className="space-y-4">
                <div className="h-48 animate-pulse bg-gray-200 rounded-xl"></div>
                <div className="h-48 animate-pulse bg-gray-200 rounded-xl"></div>
              </div>
            ) : upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No upcoming appointments</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
