
import React, { useState, useEffect, useRef } from 'react';
import DoctorSidebar from '@/components/DoctorSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Send, Video, Phone, User, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  sender: 'doctor' | 'patient';
  content: string;
  timestamp: Date;
}

interface Patient {
  id: string;
  name: string;
  avatar?: string;
  lastSeen: string;
  status: 'online' | 'offline';
}

const SAMPLE_PATIENTS: Patient[] = [
  { id: '1', name: 'John Smith', lastSeen: 'Now', status: 'online' },
  { id: '2', name: 'Emma Johnson', lastSeen: '5 minutes ago', status: 'offline' },
  { id: '3', name: 'Michael Brown', lastSeen: '1 hour ago', status: 'offline' },
  { id: '4', name: 'Sophia Martinez', lastSeen: 'Yesterday', status: 'offline' },
  { id: '5', name: 'William Taylor', lastSeen: '2 days ago', status: 'offline' },
];

const SAMPLE_MESSAGES: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      sender: 'patient',
      content: 'Hello doctor, I still have a mild fever. Should I continue with the medication?',
      timestamp: new Date(Date.now() - 60000 * 30)
    },
    {
      id: '2',
      sender: 'doctor',
      content: 'Yes, please continue with the prescribed medicine for at least 3 more days. Keep monitoring your temperature.',
      timestamp: new Date(Date.now() - 60000 * 25)
    },
    {
      id: '3',
      sender: 'patient',
      content: 'Thank you, doctor. Should I schedule a follow-up visit?',
      timestamp: new Date(Date.now() - 60000 * 20)
    },
    {
      id: '4',
      sender: 'doctor',
      content: 'If your fever persists beyond 3 days, please schedule a follow-up. Otherwise, just complete the course of medication.',
      timestamp: new Date(Date.now() - 60000 * 15)
    },
  ],
  '2': [
    {
      id: '1',
      sender: 'patient',
      content: 'Doctor, I wanted to ask about the side effects of the medication you prescribed.',
      timestamp: new Date(Date.now() - 60000 * 120)
    },
    {
      id: '2',
      sender: 'doctor',
      content: 'The most common side effects include drowsiness and mild nausea. They should subside after a few days.',
      timestamp: new Date(Date.now() - 60000 * 115)
    },
  ],
};

const PatientChat = () => {
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    
    setTimeout(() => {
      setPatients(SAMPLE_PATIENTS);
      setLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    if (activePatient) {
      setMessages(SAMPLE_MESSAGES[activePatient.id] || []);
    }
  }, [activePatient]);
  
  useEffect(() => {
    
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activePatient) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: 'doctor',
      content: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    
  };
  
  const startVideoCall = () => {
    if (!activePatient) return;
    
    toast({
      title: "Video call initiated",
      description: `Starting video call with ${activePatient.name}`,
    });
  };
  
  const startVoiceCall = () => {
    if (!activePatient) return;
    
    toast({
      title: "Voice call initiated",
      description: `Starting voice call with ${activePatient.name}`,
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <header className="p-4 border-b">
          <div className="mb-2 flex items-center">
            <MessageCircle className="mr-3 h-6 w-6 text-medical-primary" />
            <h1 className="text-xl font-bold">Patient Communication</h1>
          </div>
          <Tabs defaultValue="chat">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="teleconsultation">Teleconsultation</TabsTrigger>
            </TabsList>
          </Tabs>
        </header>
        
        <main className="flex-1 overflow-hidden flex">
          {/* Patient List */}
          <div className="w-72 border-r bg-white overflow-hidden flex flex-col">
            <div className="p-3 border-b">
              <Input 
                placeholder="Search patients..." 
                className="text-sm" 
              />
            </div>
            
            <ScrollArea className="flex-1">
              {loading ? (
                <div className="p-4 space-y-4">
                  <div className="h-16 animate-pulse bg-gray-200 rounded"></div>
                  <div className="h-16 animate-pulse bg-gray-200 rounded"></div>
                  <div className="h-16 animate-pulse bg-gray-200 rounded"></div>
                </div>
              ) : (
                <div className="p-2">
                  {patients.map(patient => (
                    <div
                      key={patient.id}
                      className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                        activePatient?.id === patient.id
                          ? 'bg-medical-primary bg-opacity-10 text-medical-primary'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActivePatient(patient)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={patient.avatar} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {patient.status === 'online' && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <p className="font-medium truncate">{patient.name}</p>
                          <p className="text-xs text-gray-500">{patient.lastSeen}</p>
                        </div>
                        <p className="text-xs text-gray-500 flex items-center">
                          {patient.status === 'online' ? (
                            <>
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block mr-1"></span>
                              Online
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              {patient.lastSeen}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          
          
          <div className="flex-1 flex flex-col">
            <TabsContent value="chat" className="flex-1 flex flex-col data-[state=active]:flex data-[state=inactive]:hidden overflow-hidden">
              {activePatient ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b flex justify-between items-center bg-white">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activePatient.avatar} />
                        <AvatarFallback>{activePatient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="font-medium">{activePatient.name}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          {activePatient.status === 'online' ? (
                            <>
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block mr-1"></span>
                              Online
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              Last seen {activePatient.lastSeen}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 w-9 p-0"
                        onClick={startVoiceCall}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 w-9 p-0"
                        onClick={startVideoCall}
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 w-9 p-0"
                        onClick={() => {
                          toast({
                            title: "View Patient Profile",
                            description: "Opening patient profile",
                          });
                        }}
                      >
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4 bg-gray-50">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                              message.sender === 'doctor'
                                ? 'bg-medical-primary text-medical-dark ml-12'
                                : 'bg-white border ml-0 mr-12'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'doctor' ? 'text-medical-dark text-opacity-75' : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" className="bg-medical-primary text-medical-dark">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700">Select a patient</h2>
                    <p className="text-gray-500 mt-1">Choose a patient from the list to start chatting</p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="teleconsultation" className="flex-1 data-[state=active]:flex data-[state=inactive]:hidden justify-center items-center">
              <div className="text-center p-8">
                <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">Teleconsultation Hub</h2>
                <p className="text-gray-500 mt-2 mb-6 max-w-md">
                  Start virtual consultations with your patients through video or voice calls.
                </p>
                <Button
                  className="bg-medical-primary text-medical-dark"
                  onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "Teleconsultation feature will be available soon",
                    });
                  }}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Start Teleconsultation
                </Button>
              </div>
            </TabsContent>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientChat;
