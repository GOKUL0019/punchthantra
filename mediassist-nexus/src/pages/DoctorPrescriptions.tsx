
import React, { useEffect, useState } from 'react';
import DoctorSidebar from '@/components/DoctorSidebar';
import PrescriptionForm from '@/components/PrescriptionForm';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pill, FileText, Search, Plus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { useToast } from '@/components/ui/use-toast';

interface Medication {
  name: string;
  dosage: string;
  instructions: string;
  duration: string;
  refill: string;
}

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  medications: Medication[];
}

const SAMPLE_PRESCRIPTIONS: Prescription[] = [
  {
    id: '1',
    patientId: '101',
    patientName: 'John Smith',
    date: '2023-06-15',
    medications: [
      {
        name: 'Amoxicillin',
        dosage: '500mg',
        instructions: 'Take twice daily with food',
        duration: '10 days',
        refill: 'No refills',
      },
      {
        name: 'Ibuprofen',
        dosage: '400mg',
        instructions: 'Take as needed for pain',
        duration: 'As needed',
        refill: 'One refill within 30 days',
      }
    ],
  },
  {
    id: '2',
    patientId: '102',
    patientName: 'Emma Johnson',
    date: '2023-06-14',
    medications: [
      {
        name: 'Hydrocodone',
        dosage: '5mg',
        instructions: 'Take every 6 hours for pain',
        duration: '5 days',
        refill: 'No refills',
      }
    ],
  },
  {
    id: '3',
    patientId: '103',
    patientName: 'Michael Brown',
    date: '2023-06-10',
    medications: [
      {
        name: 'Vitamin D',
        dosage: '1000 IU',
        instructions: 'Take daily with a meal',
        duration: 'Ongoing',
        refill: 'Unlimited refills for 1 year',
      }
    ],
  },
];

interface Patient {
  id: string;
  name: string;
}

const SAMPLE_PATIENTS: Patient[] = [
  { id: '101', name: 'John Smith' },
  { id: '102', name: 'Emma Johnson' },
  { id: '103', name: 'Michael Brown' },
  { id: '104', name: 'Sophia Martinez' },
  { id: '105', name: 'William Taylor' },
];

const DoctorPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch this data from an API
    setTimeout(() => {
      setPrescriptions(SAMPLE_PRESCRIPTIONS);
      setFilteredPrescriptions(SAMPLE_PRESCRIPTIONS);
      setPatients(SAMPLE_PATIENTS);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = prescriptions;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(prescription => 
        prescription.patientName.toLowerCase().includes(query) ||
        prescription.medications.some(med => 
          med.name.toLowerCase().includes(query)
        )
      );
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const startDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(prescription => 
            new Date(prescription.date) >= startDate
          );
          break;
        case 'week':
          startDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(prescription => 
            new Date(prescription.date) >= startDate
          );
          break;
        case 'month':
          startDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(prescription => 
            new Date(prescription.date) >= startDate
          );
          break;
      }
    }
    
    setFilteredPrescriptions(filtered);
  }, [searchQuery, dateFilter, prescriptions]);

  const handleSavePrescription = (medications: Medication[]) => {
    if (!selectedPatient) return;
    
    const newPrescription: Prescription = {
      id: Date.now().toString(),
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      date: new Date().toISOString().split('T')[0],
      medications,
    };
    
    setPrescriptions([newPrescription, ...prescriptions]);
    setSelectedPatient(null);
    setIsFormOpen(false);
    
    toast({
      title: "Prescription created",
      description: `New prescription created for ${selectedPatient.name}`,
    });
  };

  const handleSelectPatient = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setIsFormOpen(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <div className="mb-8 flex items-center">
            <FileText className="mr-3 h-8 w-8 text-medical-primary" />
            <div>
              <h1 className="text-2xl font-bold">Prescriptions</h1>
              <p className="text-gray-600">Manage patient prescriptions</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search prescriptions..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Dialog open={isFormOpen} onOpenChange={(open) => {
              setIsFormOpen(open);
              if (!open) setSelectedPatient(null);
            }}>
              <DialogTrigger asChild>
                <Button className="bg-medical-primary text-medical-dark flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Prescription
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                {!selectedPatient ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Patient</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Input
                        placeholder="Search patients..."
                        className="mb-4"
                      />
                      <div className="max-h-96 overflow-y-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Patient ID</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {patients.map((patient) => (
                              <TableRow key={patient.id}>
                                <TableCell>{patient.id}</TableCell>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    size="sm"
                                    onClick={() => handleSelectPatient(patient.id)}
                                  >
                                    Select
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <PrescriptionForm
                    patientName={selectedPatient.name}
                    patientId={selectedPatient.id}
                    onClose={() => {
                      setSelectedPatient(null);
                      setIsFormOpen(false);
                    }}
                    onSave={handleSavePrescription}
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              <div className="h-28 animate-pulse bg-gray-200 rounded-xl"></div>
              <div className="h-28 animate-pulse bg-gray-200 rounded-xl"></div>
              <div className="h-28 animate-pulse bg-gray-200 rounded-xl"></div>
            </div>
          ) : filteredPrescriptions.length > 0 ? (
            <div className="space-y-4">
              {filteredPrescriptions.map((prescription) => (
                <Card key={prescription.id} className="overflow-hidden">
                  <Collapsible className="w-full">
                    <CollapsibleTrigger className="w-full text-left">
                      <CardHeader className="bg-medical-light hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-lg">{prescription.patientName}</CardTitle>
                            <p className="text-sm text-gray-500">
                              {new Date(prescription.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {prescription.medications.length} medication{prescription.medications.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          {prescription.medications.map((medication, idx) => (
                            <div key={idx} className="p-4 bg-white rounded-lg border">
                              <div className="flex items-center mb-2">
                                <Pill className="h-5 w-5 mr-2 text-medical-primary" />
                                <span className="font-medium">{medication.name} ({medication.dosage})</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-500">Instructions:</p>
                                  <p>{medication.instructions}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Duration:</p>
                                  <p>{medication.duration}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Refill:</p>
                                  <p>{medication.refill}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => {
                              toast({
                                title: "Print Prescription",
                                description: "Prescription sent to printer",
                              });
                            }}
                          >
                            Print Prescription
                          </Button>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No prescriptions found</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorPrescriptions;
