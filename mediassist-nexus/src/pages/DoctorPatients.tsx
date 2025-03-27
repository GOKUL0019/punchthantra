
import React, { useEffect, useState } from 'react';
import DoctorSidebar from '@/components/DoctorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Search, FileText, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  diagnosis: string;
  status: 'in-progress' | 'completed' | 'cancelled' | 'waiting';
  phone: string;
  email: string;
}

const SAMPLE_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 45,
    gender: 'male',
    lastVisit: '2023-06-15',
    diagnosis: 'Hypertension',
    status: 'completed',
    phone: '(555) 123-4567',
    email: 'john.smith@example.com'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    age: 32,
    gender: 'female',
    lastVisit: '2023-06-15',
    diagnosis: 'Fever and cough',
    status: 'in-progress',
    phone: '(555) 234-5678',
    email: 'emma.johnson@example.com'
  },
  {
    id: '3',
    name: 'Michael Brown',
    age: 58,
    gender: 'male',
    lastVisit: '2023-06-14',
    diagnosis: 'Diabetes follow-up',
    status: 'waiting',
    phone: '(555) 345-6789',
    email: 'michael.brown@example.com'
  },
  {
    id: '4',
    name: 'Sophia Martinez',
    age: 28,
    gender: 'female',
    lastVisit: '2023-06-13',
    diagnosis: 'Migraine',
    status: 'completed',
    phone: '(555) 456-7890',
    email: 'sophia.martinez@example.com'
  },
  {
    id: '5',
    name: 'William Taylor',
    age: 64,
    gender: 'male',
    lastVisit: '2023-06-10',
    diagnosis: 'Arthritis',
    status: 'cancelled',
    phone: '(555) 567-8901',
    email: 'william.taylor@example.com'
  },
];

const DoctorPatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch from an API
    setTimeout(() => {
      setPatients(SAMPLE_PATIENTS);
      setFilteredPatients(SAMPLE_PATIENTS);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = patients.filter(patient => 
        patient.name.toLowerCase().includes(query) ||
        patient.diagnosis.toLowerCase().includes(query) ||
        patient.id.includes(query)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchQuery, patients]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Waiting</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewPatientDetails = (patientId: string) => {
    toast({
      title: "Patient Details",
      description: `Viewing details for patient #${patientId}`,
    });
  };

  const getPatientsByStatus = (status: string) => {
    return patients.filter(patient => patient.status === status);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <div className="mb-8 flex items-center">
            <Users className="mr-3 h-8 w-8 text-medical-primary" />
            <div>
              <h1 className="text-2xl font-bold">Patients</h1>
              <p className="text-gray-600">Manage and view patient records</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search patients by name, ID or diagnosis"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Patients</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="waiting">Waiting</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>All Patients</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="p-6 space-y-4">
                      <div className="h-8 animate-pulse bg-gray-200 rounded"></div>
                      <div className="h-28 animate-pulse bg-gray-200 rounded"></div>
                    </div>
                  ) : filteredPatients.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Age/Gender</TableHead>
                          <TableHead>Last Visit</TableHead>
                          <TableHead>Diagnosis</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPatients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell className="font-medium">{patient.id}</TableCell>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.age} | {patient.gender === 'male' ? 'M' : 'F'}</TableCell>
                            <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                            <TableCell>{patient.diagnosis}</TableCell>
                            <TableCell>{getStatusBadge(patient.status)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 text-xs"
                                  onClick={() => handleViewPatientDetails(patient.id)}
                                >
                                  View Details
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 text-xs"
                                  onClick={() => {
                                    toast({
                                      title: "Medical Records",
                                      description: `Viewing medical records for ${patient.name}`,
                                    });
                                  }}
                                >
                                  <FileText className="h-3.5 w-3.5 mr-1" />
                                  Records
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-12 text-center text-gray-500">
                      <p>No patients found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {['in-progress', 'waiting', 'completed', 'cancelled'].map(status => (
              <TabsContent key={status} value={status}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>{status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')} Patients</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {loading ? (
                      <div className="p-6 space-y-4">
                        <div className="h-8 animate-pulse bg-gray-200 rounded"></div>
                        <div className="h-28 animate-pulse bg-gray-200 rounded"></div>
                      </div>
                    ) : getPatientsByStatus(status).length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Age/Gender</TableHead>
                            <TableHead>Last Visit</TableHead>
                            <TableHead>Diagnosis</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getPatientsByStatus(status).map((patient) => (
                            <TableRow key={patient.id}>
                              <TableCell className="font-medium">{patient.id}</TableCell>
                              <TableCell>{patient.name}</TableCell>
                              <TableCell>{patient.age} | {patient.gender === 'male' ? 'M' : 'F'}</TableCell>
                              <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                              <TableCell>{patient.diagnosis}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="h-8 text-xs"
                                    onClick={() => handleViewPatientDetails(patient.id)}
                                  >
                                    View Details
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="h-8 text-xs"
                                    onClick={() => {
                                      toast({
                                        title: "Medical Records",
                                        description: `Viewing medical records for ${patient.name}`,
                                      });
                                    }}
                                  >
                                    <FileText className="h-3.5 w-3.5 mr-1" />
                                    Records
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="py-12 text-center text-gray-500">
                        <p>No {status.replace('-', ' ')} patients</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DoctorPatients;
