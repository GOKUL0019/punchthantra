
import React, { useEffect, useState } from 'react';
import PatientSidebar from '@/components/PatientSidebar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History } from 'lucide-react';

interface HealthRecord {
  id: string;
  date: string;
  hospitalName: string;
  doctorName: string;
  issue: string;
  treatment: string;
}

const SAMPLE_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: '1',
    date: 'June 15, 2023',
    hospitalName: 'City General Hospital',
    doctorName: 'Dr. Sarah Johnson',
    issue: 'Seasonal Flu',
    treatment: 'Prescribed antivirals and recommended rest',
  },
  {
    id: '2',
    date: 'March 3, 2023',
    hospitalName: 'Memorial Medical Center',
    doctorName: 'Dr. Michael Chen',
    issue: 'Sprained Ankle',
    treatment: 'Applied cast, prescribed pain medication',
  },
  {
    id: '3',
    date: 'December 10, 2022',
    hospitalName: 'Central Health Clinic',
    doctorName: 'Dr. Emily Rodriguez',
    issue: 'Annual Physical',
    treatment: 'All vitals normal, recommended vitamin D supplement',
  },
  {
    id: '4',
    date: 'August 22, 2022',
    hospitalName: 'City General Hospital',
    doctorName: 'Dr. James Wilson',
    issue: 'Migraine',
    treatment: 'Prescribed pain relievers and anti-nausea medication',
  },
];

const HealthHistory = () => {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    setTimeout(() => {
      setHealthRecords(SAMPLE_HEALTH_RECORDS);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <PatientSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <div className="mb-8 flex items-center">
            <History className="mr-3 h-8 w-8 text-medical-primary" />
            <div>
              <h1 className="text-2xl font-bold">Health History</h1>
              <p className="text-gray-600">Your complete medical visit history</p>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Visit History</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
                  <div className="h-20 animate-pulse bg-gray-200 rounded"></div>
                  <div className="h-20 animate-pulse bg-gray-200 rounded"></div>
                </div>
              ) : healthRecords.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Medical Issue</TableHead>
                      <TableHead>Treatment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {healthRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.date}</TableCell>
                        <TableCell>{record.hospitalName}</TableCell>
                        <TableCell>{record.doctorName}</TableCell>
                        <TableCell>{record.issue}</TableCell>
                        <TableCell>{record.treatment}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p>No health records found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default HealthHistory;
