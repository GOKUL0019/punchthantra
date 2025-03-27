
import React, { useState } from 'react';
import PatientSidebar from '@/components/PatientSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TokenDisplay from '@/components/TokenDisplay';
import { useToast } from '@/hooks/use-toast';
import { Hospital, Calendar, UserRound, Clock } from 'lucide-react';


const HOSPITALS = [
  { id: '1', name: 'City General Hospital', waitTime: 45, currentToken: 12, queueLength: 8 },
  { id: '2', name: 'Memorial Medical Center', waitTime: 30, currentToken: 25, queueLength: 5 },
  { id: '3', name: 'Central Health Clinic', waitTime: 15, currentToken: 8, queueLength: 2 },
  { id: '4', name: 'Metro Healthcare', waitTime: 60, currentToken: 18, queueLength: 12 },
  { id: '5', name: 'Riverside Medical', waitTime: 20, currentToken: 42, queueLength: 4 },
];


const appointmentFormSchema = z.object({
  hospital: z.string({ required_error: "Please select a hospital" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 120, {
    message: "Age must be a number between 1 and 120",
  }),
  gender: z.string({ required_error: "Please select your gender" }),
});

const Appointments = () => {
  const { toast } = useToast();
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [checkDialogOpen, setCheckDialogOpen] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  
  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
    },
  });

  
  const onSubmit = (values: z.infer<typeof appointmentFormSchema>) => {
    
    const tokenNumber = Math.floor(Math.random() * 40) + 10;
    const currentToken = Math.floor(Math.random() * (tokenNumber - 1)) + 1;
    
    
    const selectedHospital = HOSPITALS.find(h => h.id === values.hospital);
    
    
    const appointment = {
      id: Date.now().toString(),
      hospitalName: selectedHospital?.name || 'Unknown Hospital',
      patientName: values.name,
      patientAge: values.age,
      patientGender: values.gender,
      tokenNumber,
      currentToken,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, appointment]));
    
    
    setBookedAppointment(appointment);
    
   
    toast({
      title: "Appointment booked successfully!",
      description: `Your token number is ${tokenNumber}`,
    });
    
   
    form.reset();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <PatientSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Appointments</h1>
            <p className="text-gray-600">Book an appointment or check doctor availability</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Card className="animated-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-medical-primary" />
                  Book Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Book a new appointment with a doctor</p>
                <Button 
                  className="w-full bg-medical-primary text-medical-dark hover:bg-medical-primary/90"
                  onClick={() => setBookDialogOpen(true)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
            
            
            <Card className="animated-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-medical-primary" />
                  Check Doctor Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Check the current queue status at hospitals</p>
                <Button 
                  className="w-full bg-medical-dark text-white hover:bg-medical-dark/90"
                  onClick={() => setCheckDialogOpen(true)}
                >
                  Check Now
                </Button>
              </CardContent>
            </Card>
          </div>
          
          
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
            {bookedAppointment && (
              <div className="mb-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{bookedAppointment.hospitalName}</h3>
                        <p className="text-sm text-gray-600">Patient: {bookedAppointment.patientName}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-gray-600">{bookedAppointment.date}</span>
                        <span className="text-sm">{bookedAppointment.time}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <TokenDisplay 
                        tokenNumber={bookedAppointment.tokenNumber} 
                        currentToken={bookedAppointment.currentToken}
                        isActive={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
      
      
      <Dialog open={bookDialogOpen} onOpenChange={setBookDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
            <DialogDescription>
              Fill in the details to book your appointment
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="hospital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a hospital" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {HOSPITALS.map((hospital) => (
                          <SelectItem key={hospital.id} value={hospital.id}>
                            {hospital.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  className="bg-medical-primary text-medical-dark hover:bg-medical-primary/90"
                >
                  Book Appointment
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      
      <Dialog open={checkDialogOpen} onOpenChange={setCheckDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Hospital Queue Status</DialogTitle>
            <DialogDescription>
              Check the current queue length and estimated wait times
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            {HOSPITALS.map((hospital) => (
              <Card key={hospital.id} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-medical-primary bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                        <Hospital className="h-5 w-5 text-medical-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{hospital.name}</h3>
                        <div className="flex items-center mt-1">
                          <UserRound className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {hospital.queueLength} patients in queue
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Current Token: 
                        <span className="ml-1 text-medical-primary">{hospital.currentToken}</span>
                      </div>
                      <div className="text-sm text-gray-600">~{hospital.waitTime} min wait</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
