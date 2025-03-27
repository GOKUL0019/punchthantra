
import React, { useEffect, useState } from 'react';
import DoctorSidebar from '@/components/DoctorSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, Clock, Activity, FileText, ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/components/ui/use-toast';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  tokenNumber: number;
  appointmentTime: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
}

const SAMPLE_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Arun',
    age: 45,
    gender: 'male',
    tokenNumber: 10,
    appointmentTime: '10:00 AM',
    status: 'completed',
  },
  {
    id: '2',
    name: 'Aravind',
    age: 32,
    gender: 'female',
    tokenNumber: 11,
    appointmentTime: '10:15 AM',
    status: 'in-progress',
  },
  {
    id: '3',
    name: 'Gowtham',
    age: 58,
    gender: 'male',
    tokenNumber: 12,
    appointmentTime: '10:30 AM',
    status: 'waiting',
  },
  {
    id: '4',
    name: 'Shiva',
    age: 28,
    gender: 'female',
    tokenNumber: 13,
    appointmentTime: '10:45 AM',
    status: 'waiting',
  },
  {
    id: '5',
    name: 'Williamson',
    age: 64,
    gender: 'male',
    tokenNumber: 14,
    appointmentTime: '11:00 AM',
    status: 'waiting',
  },
];

const DoctorDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctorData, setDoctorData] = useState<any>(null);
  const [currentToken, setCurrentToken] = useState(11);
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    completionRate: 0,
    averageFeedback: 0,
  });

  const { toast } = useToast();

  useEffect(() => {
    
    const storedDoctorData = localStorage.getItem('doctorData');
    if (storedDoctorData) {
      setDoctorData(JSON.parse(storedDoctorData));
    }
    
    
    setTimeout(() => {
      setPatients(SAMPLE_PATIENTS);
      
      
      const total = SAMPLE_PATIENTS.length;
      const completed = SAMPLE_PATIENTS.filter(p => p.status === 'completed').length;
      
      setStats({
        totalPatients: total,
        completionRate: completed / total * 100,
        averageFeedback: 4.7,
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleNextPatient = () => {
    setCurrentToken(prev => prev + 1);
    setPatients(prev => 
      prev.map(patient => {
        if (patient.tokenNumber === currentToken) {
          return { ...patient, status: 'completed' as const };
        } else if (patient.tokenNumber === currentToken + 1) {
          return { ...patient, status: 'in-progress' as const };
        }
        return patient;
      })
    );

    toast({
      title: "Next patient called",
      description: `Token #${currentToken + 1} is now being seen`,
    });
  };

  const handleStatusChange = (id: string, newStatus: 'waiting' | 'in-progress' | 'completed' | 'cancelled') => {
    setPatients(prev => 
      prev.map(patient => {
        if (patient.id === id) {
          return { ...patient, status: newStatus };
        }
        return patient;
      })
    );

    toast({
      title: "Status updated",
      description: `Patient's status changed to ${newStatus}`,
    });
  };

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    toast({
      title: isAvailable ? "You are now offline" : "You are now online",
      description: isAvailable ? "Patients cannot join your queue" : "Patients can now join your queue",
      variant: isAvailable ? "destructive" : "default",
    });
  };

  const currentPatient = patients.find(p => p.status === 'in-progress');
  const waitingPatients = patients.filter(p => p.status === 'waiting');
  const completedPatients = patients.filter(p => p.status === 'completed');

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, Dr. {doctorData?.name || 'Doctor'}</h1>
              <p className="text-gray-600">{doctorData?.speciality || 'Specialist'} • {doctorData?.hospital || 'Hospital'}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Availability Status:</span>
              <Toggle 
                pressed={isAvailable} 
                onPressedChange={toggleAvailability}
                className={`${isAvailable ? 'bg-medical-primary text-medical-dark' : 'bg-gray-300'} data-[state=on]:bg-medical-primary`}
              >
                {isAvailable ? 'Available' : 'Unavailable'}
              </Toggle>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="animated-card">
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 bg-medical-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-medical-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patients Today</p>
                  <p className="text-2xl font-semibold">{patients.length}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animated-card">
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Token</p>
                  <p className="text-2xl font-semibold">{currentToken}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animated-card">
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Waiting</p>
                  <p className="text-2xl font-semibold">{waitingPatients.length}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animated-card">
              <CardContent className="p-6 flex items-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Activity className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-semibold">{completedPatients.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="current">
                <TabsList className="mb-4">
                  <TabsTrigger value="current">Current Patient</TabsTrigger>
                  <TabsTrigger value="waiting">Waiting List</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="current">
                  <h2 className="text-xl font-semibold mb-4">Current Patient</h2>
                  {loading ? (
                    <div className="h-48 animate-pulse bg-gray-200 rounded-xl"></div>
                  ) : currentPatient ? (
                    <Card className="animated-card">
                      <div className="h-2 bg-medical-primary"></div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <span className="blink-dot"></span>
                              <h3 className="font-semibold text-lg">{currentPatient.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600">
                              {currentPatient.age} years • {currentPatient.gender === 'male' ? 'Male' : 'Female'}
                            </p>
                          </div>
                          <div className="bg-medical-primary bg-opacity-10 px-3 py-1 rounded-full">
                            <span className="text-medical-primary font-medium">Token {currentPatient.tokenNumber}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                          <Button
                            variant="outline"
                            className="text-blue-500 border-blue-500"
                            onClick={() => toast({
                              title: "Medical history",
                              description: "Viewing patient's medical history",
                            })}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View History
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="text-purple-500 border-purple-500"
                            onClick={() => toast({
                              title: "Chat initiated",
                              description: "Starting chat with patient",
                            })}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Update Status:</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge 
                              variant="outline" 
                              className="cursor-pointer hover:bg-yellow-100 border-yellow-400 text-yellow-700"
                              onClick={() => handleStatusChange(currentPatient.id, 'waiting')}
                            >
                              Pending
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className="cursor-pointer bg-blue-100 hover:bg-blue-200 border-blue-400 text-blue-700"
                              onClick={() => handleStatusChange(currentPatient.id, 'in-progress')}
                            >
                              In Progress
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className="cursor-pointer hover:bg-green-100 border-green-400 text-green-700"
                              onClick={() => handleStatusChange(currentPatient.id, 'completed')}
                            >
                              Completed
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className="cursor-pointer hover:bg-red-100 border-red-400 text-red-700"
                              onClick={() => handleStatusChange(currentPatient.id, 'cancelled')}
                            >
                              Cancelled
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-between">
                          <Button 
                            variant="outline"
                            className="secondary-button py-2"
                            onClick={handleNextPatient}
                          >
                            Next Patient
                          </Button>
                          
                          <Button 
                            className="primary-button py-2"
                            onClick={() => toast({
                              title: "Prescription",
                              description: "Creating a new prescription",
                            })}
                          >
                            Add Prescription
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-gray-50">
                      <CardContent className="p-8 text-center">
                        <p className="text-gray-500">No active patients</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="waiting">
                  <h2 className="text-xl font-semibold mb-4">Waiting List</h2>
                  {loading ? (
                    <div className="space-y-4">
                      <div className="h-24 animate-pulse bg-gray-200 rounded-xl"></div>
                      <div className="h-24 animate-pulse bg-gray-200 rounded-xl"></div>
                    </div>
                  ) : waitingPatients.length > 0 ? (
                    <div className="space-y-4">
                      {waitingPatients.map(patient => (
                        <Card key={patient.id} className="animated-card">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{patient.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {patient.age} years • {patient.gender === 'male' ? 'Male' : 'Female'}
                                </p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-gray-500">{patient.appointmentTime}</span>
                                <div className="bg-gray-100 px-3 py-1 rounded-full">
                                  <span className="text-gray-700">Token {patient.tokenNumber}</span>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-medical-primary border-medical-primary"
                                  onClick={() => {
                                    setCurrentToken(patient.tokenNumber);
                                    handleStatusChange(patient.id, 'in-progress');
                                  }}
                                >
                                  Call Now
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="bg-gray-50">
                      <CardContent className="p-8 text-center">
                        <p className="text-gray-500">No patients waiting</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="analytics">
                  <h2 className="text-xl font-semibold mb-4">Performance Analytics</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Users className="h-8 w-8 text-medical-primary mx-auto mb-2" />
                        <h3 className="text-lg font-medium">Total Patients</h3>
                        <p className="text-3xl font-bold mt-2">{stats.totalPatients}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <h3 className="text-lg font-medium">Completion Rate</h3>
                        <p className="text-3xl font-bold mt-2">{stats.completionRate.toFixed(1)}%</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <ThumbsUp className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                        <h3 className="text-lg font-medium">Avg. Feedback</h3>
                        <p className="text-3xl font-bold mt-2">{stats.averageFeedback}/5</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Completed</h2>
              {loading ? (
                <div className="space-y-4">
                  <div className="h-24 animate-pulse bg-gray-200 rounded-xl"></div>
                  <div className="h-24 animate-pulse bg-gray-200 rounded-xl"></div>
                </div>
              ) : completedPatients.length > 0 ? (
                <div className="space-y-4">
                  {completedPatients.map(patient => (
                    <Card key={patient.id} className="animated-card">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{patient.name}</h3>
                            <p className="text-sm text-gray-600">
                              {patient.age} years • {patient.gender === 'male' ? 'Male' : 'Female'}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="bg-gray-100 px-3 py-1 rounded-full">
                              <span className="text-gray-700">#{patient.tokenNumber}</span>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-xs text-medical-primary h-6"
                              onClick={() => toast({
                                title: "View Details",
                                description: `Viewing details for ${patient.name}`,
                              })}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-gray-50">
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">No completed consultations</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
