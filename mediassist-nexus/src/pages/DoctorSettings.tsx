
import React, { useEffect, useState } from 'react';
import DoctorSidebar from '@/components/DoctorSidebar';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Settings, User, Bell, Shield, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DoctorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  speciality: string;
  hospital: string;
  bio: string;
  avatar?: string;
}

const DoctorSettings = () => {
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile>({
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    email: 'dr.sarah@example.com',
    phone: '+1 (555) 123-4567',
    speciality: 'Cardiologist',
    hospital: 'City General Hospital',
    bio: 'Board certified cardiologist with 10+ years of experience in treating heart conditions and preventative care.',
  });
  
  const [loading, setLoading] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    appointmentReminders: true,
    newPatientAlerts: true,
    systemUpdates: false,
  });
  
  const [availabilitySettings, setAvailabilitySettings] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '15:00' },
    saturday: { enabled: false, start: '10:00', end: '14:00' },
    sunday: { enabled: false, start: '10:00', end: '14:00' },
  });
  
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch doctor profile from API
    setTimeout(() => {
      // Get from localStorage if available
      const storedDoctorData = localStorage.getItem('doctorData');
      if (storedDoctorData) {
        try {
          const data = JSON.parse(storedDoctorData);
          setDoctorProfile(prev => ({ ...prev, ...data }));
        } catch (e) {
          console.error("Error parsing doctor data:", e);
        }
      }
      setLoading(false);
    }, 1000);
  }, []);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage for demo purposes
    localStorage.setItem('doctorData', JSON.stringify(doctorProfile));
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved",
    });
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Notification settings updated",
      description: `${key} is now ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleAvailabilityChange = (
    day: keyof typeof availabilitySettings,
    field: keyof typeof availabilitySettings.monday,
    value: string | boolean
  ) => {
    setAvailabilitySettings(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSaveAvailability = () => {
    toast({
      title: "Availability settings saved",
      description: "Your working hours have been updated",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <div className="mb-8 flex items-center">
            <Settings className="mr-3 h-8 w-8 text-medical-primary" />
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-gray-600">Manage your profile and preferences</p>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="mb-4">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="availability" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Availability
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal and professional details</CardDescription>
                </CardHeader>
                
                {loading ? (
                  <CardContent className="space-y-4">
                    <div className="h-32 animate-pulse bg-gray-200 rounded"></div>
                    <div className="h-48 animate-pulse bg-gray-200 rounded"></div>
                  </CardContent>
                ) : (
                  <form onSubmit={handleProfileUpdate}>
                    <CardContent className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={doctorProfile.avatar} />
                          <AvatarFallback>{doctorProfile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Upload Photo",
                                description: "This feature is coming soon",
                              });
                            }}
                          >
                            Upload Photo
                          </Button>
                          <p className="text-xs text-gray-500 mt-1">
                            JPG, GIF or PNG. 1MB max.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={doctorProfile.name}
                            onChange={(e) => setDoctorProfile(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="speciality">Speciality</Label>
                          <Input
                            id="speciality"
                            value={doctorProfile.speciality}
                            onChange={(e) => setDoctorProfile(prev => ({ ...prev, speciality: e.target.value }))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={doctorProfile.email}
                            onChange={(e) => setDoctorProfile(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={doctorProfile.phone}
                            onChange={(e) => setDoctorProfile(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="hospital">Hospital/Clinic</Label>
                          <Input
                            id="hospital"
                            value={doctorProfile.hospital}
                            onChange={(e) => setDoctorProfile(prev => ({ ...prev, hospital: e.target.value }))}
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Professional Bio</Label>
                          <Textarea
                            id="bio"
                            rows={4}
                            value={doctorProfile.bio}
                            onChange={(e) => setDoctorProfile(prev => ({ ...prev, bio: e.target.value }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-medical-primary text-medical-dark"
                      >
                        Save Changes
                      </Button>
                    </CardFooter>
                  </form>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Appointment Reminders</p>
                        <p className="text-sm text-gray-500">Get notified about upcoming appointments</p>
                      </div>
                      <Switch
                        checked={notificationSettings.appointmentReminders}
                        onCheckedChange={(checked) => handleNotificationChange('appointmentReminders', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Patient Alerts</p>
                        <p className="text-sm text-gray-500">Receive alerts when new patients register</p>
                      </div>
                      <Switch
                        checked={notificationSettings.newPatientAlerts}
                        onCheckedChange={(checked) => handleNotificationChange('newPatientAlerts', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System Updates</p>
                        <p className="text-sm text-gray-500">Get notified about system updates and maintenance</p>
                      </div>
                      <Switch
                        checked={notificationSettings.systemUpdates}
                        onCheckedChange={(checked) => handleNotificationChange('systemUpdates', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="availability">
              <Card>
                <CardHeader>
                  <CardTitle>Working Hours</CardTitle>
                  <CardDescription>Set your availability for patient appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(availabilitySettings).map(([day, settings]) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="w-24 font-medium capitalize">{day}</div>
                        <Switch
                          checked={settings.enabled}
                          onCheckedChange={(checked) => 
                            handleAvailabilityChange(day as keyof typeof availabilitySettings, 'enabled', checked)
                          }
                        />
                        <div className="flex items-center space-x-2 flex-1">
                          <Input
                            type="time"
                            value={settings.start}
                            onChange={(e) => 
                              handleAvailabilityChange(day as keyof typeof availabilitySettings, 'start', e.target.value)
                            }
                            disabled={!settings.enabled}
                            className="w-32"
                          />
                          <span>to</span>
                          <Input
                            type="time"
                            value={settings.end}
                            onChange={(e) => 
                              handleAvailabilityChange(day as keyof typeof availabilitySettings, 'end', e.target.value)
                            }
                            disabled={!settings.enabled}
                            className="w-32"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    className="bg-medical-primary text-medical-dark"
                    onClick={handleSaveAvailability}
                  >
                    Save Working Hours
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button
                      className="mt-4 bg-medical-primary text-medical-dark"
                      onClick={() => {
                        toast({
                          title: "Password updated",
                          description: "Your password has been changed successfully",
                        });
                      }}
                    >
                      Update Password
                    </Button>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Coming Soon",
                          description: "Two-factor authentication will be available in a future update",
                        });
                      }}
                    >
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DoctorSettings;
