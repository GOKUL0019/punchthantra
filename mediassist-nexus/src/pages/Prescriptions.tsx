
import React, { useEffect, useState } from 'react';
import PatientSidebar from '@/components/PatientSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, User, Clock, Pill } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Prescription {
  id: string;
  date: string;
  doctorName: string;
  hospitalName: string;
  medications: {
    name: string;
    dosage: string;
    instructions: string;
    duration: string;
    refill: string;
  }[];
}

const SAMPLE_PRESCRIPTIONS: Prescription[] = [
  {
    id: '1',
    date: 'June 15, 2023',
    doctorName: 'Dr. Sarah Johnson',
    hospitalName: 'City General Hospital',
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
    date: 'March 3, 2023',
    doctorName: 'Dr. Michael Chen',
    hospitalName: 'Memorial Medical Center',
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
    date: 'December 10, 2022',
    doctorName: 'Dr. Emily Rodriguez',
    hospitalName: 'Central Health Clinic',
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

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setTimeout(() => {
      setPrescriptions(SAMPLE_PRESCRIPTIONS);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <PatientSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <div className="mb-8 flex items-center">
            <FileText className="mr-3 h-8 w-8 text-medical-primary" />
            <div>
              <h1 className="text-2xl font-bold">Prescriptions</h1>
              <p className="text-gray-600">View and manage your prescribed medications</p>
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              <div className="h-48 animate-pulse bg-gray-200 rounded-xl"></div>
              <div className="h-48 animate-pulse bg-gray-200 rounded-xl"></div>
            </div>
          ) : prescriptions.length > 0 ? (
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="overflow-hidden">
                  <Collapsible className="w-full">
                    <CollapsibleTrigger className="w-full text-left">
                      <CardHeader className="bg-medical-light hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">{prescription.hospitalName}</CardTitle>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {prescription.date}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <User className="h-4 w-4 mr-1" />
                          {prescription.doctorName}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-4">
                        <h3 className="font-medium mb-3">Prescribed Medications</h3>
                        <div className="space-y-4">
                          {prescription.medications.map((medication, idx) => (
                            <div key={idx} className="p-4 bg-white rounded-lg border">
                              <div className="flex items-center mb-2">
                                <Pill className="h-5 w-5 mr-2 text-medical-primary" />
                                <span className="font-medium">{medication.name} ({medication.dosage})</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-start">
                                  <Clock className="h-4 w-4 mr-1 mt-0.5 text-gray-500" />
                                  <div>
                                    <p className="text-gray-500">Instructions:</p>
                                    <p>{medication.instructions}</p>
                                  </div>
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

export default Prescriptions;
