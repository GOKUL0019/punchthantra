
import React, { useEffect, useState } from 'react';
import DoctorSidebar from '@/components/DoctorSidebar';
import { Calendar, Search, Filter } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface Appointment {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  date: string;
  time: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  tokenNumber: number;
  reason: string;
}

const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientName: 'Akash',
    patientAge: 45,
    patientGender: 'male',
    date: '2023-06-15',
    time: '10:00 AM',
    status: 'completed',
    tokenNumber: 10,
    reason: 'Regular checkup'
  },
  {
    id: '2',
    patientName: 'Aravind',
    patientAge: 32,
    patientGender: 'female',
    date: '2023-06-15',
    time: '10:15 AM',
    status: 'in-progress',
    tokenNumber: 11,
    reason: 'Fever and cough'
  },
  {
    id: '3',
    patientName: 'Ajay',
    patientAge: 58,
    patientGender: 'male',
    date: '2023-06-15',
    time: '10:30 AM',
    status: 'pending',
    tokenNumber: 12,
    reason: 'Blood pressure check'
  },
  {
    id: '4',
    patientName: 'Avinash',
    patientAge: 28,
    patientGender: 'female',
    date: '2023-06-15',
    time: '10:45 AM',
    status: 'pending',
    tokenNumber: 13,
    reason: 'Headache'
  },
  {
    id: '5',
    patientName: 'Hari Haran',
    patientAge: 64,
    patientGender: 'male',
    date: '2023-06-16',
    time: '11:00 AM',
    status: 'pending',
    tokenNumber: 14,
    reason: 'Joint pain'
  },
  {
    id: '6',
    patientName: 'Hari Mahith',
    patientAge: 37,
    patientGender: 'female',
    date: '2023-06-16',
    time: '11:15 AM',
    status: 'pending',
    tokenNumber: 15,
    reason: 'Follow-up'
  },
  {
    id: '7',
    patientName: 'Arjun',
    patientAge: 52,
    patientGender: 'male',
    date: '2023-06-17',
    time: '09:30 AM',
    status: 'pending',
    tokenNumber: 16,
    reason: 'Stomach pain'
  },
];

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [currentToken, setCurrentToken] = useState(11); 
  
  const { toast } = useToast();

  useEffect(() => {
    
    setTimeout(() => {
      setAppointments(SAMPLE_APPOINTMENTS);
      setFilteredAppointments(SAMPLE_APPOINTMENTS);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = appointments;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(appointment => 
        appointment.patientName.toLowerCase().includes(query) ||
        appointment.reason.toLowerCase().includes(query)
      );
    }
    
    setFilteredAppointments(filtered);
  }, [statusFilter, searchQuery, appointments]);

  const updateAppointmentStatus = (id: string, newStatus: 'pending' | 'in-progress' | 'completed' | 'cancelled') => {
    setAppointments(prev => 
      prev.map(appointment => {
        if (appointment.id === id) {
          return { ...appointment, status: newStatus };
        }
        // If new status is in-progress, mark any other in-progress as completed
        if (newStatus === 'in-progress' && appointment.status === 'in-progress') {
          return { ...appointment, status: 'completed' };
        }
        return appointment;
      })
    );
    
    toast({
      title: "Status updated",
      description: `Appointment status changed to ${newStatus}`,
    });
  };

  const callPatient = (appointment: Appointment) => {
    // First, check if there's currently someone in progress
    const currentInProgress = appointments.find(app => app.status === 'in-progress');
    
    // If there's someone in progress and it's not this patient, ask for confirmation
    if (currentInProgress && currentInProgress.id !== appointment.id) {
      const confirmCall = window.confirm(
        `Currently seeing ${currentInProgress.patientName} (Token #${currentInProgress.tokenNumber}). Call ${appointment.patientName} (Token #${appointment.tokenNumber}) out of order?`
      );
      
      if (!confirmCall) return;
      
      // Mark current as completed
      updateAppointmentStatus(currentInProgress.id, 'completed');
    }
    
    // Update the current token
    setCurrentToken(appointment.tokenNumber);
    
    // Set the selected appointment to in-progress
    updateAppointmentStatus(appointment.id, 'in-progress');
    
    toast({
      title: "Patient called",
      description: `Now seeing ${appointment.patientName} (Token #${appointment.tokenNumber})`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
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

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <div className="mb-8 flex items-center">
            <Calendar className="mr-3 h-8 w-8 text-medical-primary" />
            <div>
              <h1 className="text-2xl font-bold">Appointments</h1>
              <p className="text-gray-600">Manage your patient appointments</p>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Queue Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-center bg-medical-light p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Current Token</p>
                  <p className="text-3xl font-bold text-medical-primary">{currentToken}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <p className="text-sm text-gray-600">Patients Waiting</p>
                  <p className="text-xl font-semibold">{appointments.filter(a => a.status === 'pending').length}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <p className="text-sm text-gray-600">Completed Today</p>
                  <p className="text-xl font-semibold">{appointments.filter(a => a.status === 'completed').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Filter Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by patient name or reason"
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="w-full sm:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 space-y-4">
                  <div className="h-8 animate-pulse bg-gray-200 rounded"></div>
                  <div className="h-28 animate-pulse bg-gray-200 rounded"></div>
                  <div className="h-28 animate-pulse bg-gray-200 rounded"></div>
                </div>
              ) : filteredAppointments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.tokenNumber}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{appointment.patientName}</p>
                            <p className="text-sm text-gray-500">
                              {appointment.patientAge} yrs • {appointment.patientGender === 'male' ? 'Male' : 'Female'}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                            <p className="text-sm text-gray-500">{appointment.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                        <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {appointment.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs text-medical-primary border-medical-primary"
                                onClick={() => callPatient(appointment)}
                              >
                                Call Patient
                              </Button>
                            )}
                            {appointment.status === 'in-progress' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs text-green-600 border-green-300"
                                onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                              >
                                Complete
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs text-red-500 border-red-200 hover:bg-red-50"
                              onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <p>No appointments found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DoctorAppointments;
