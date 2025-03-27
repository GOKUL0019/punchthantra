
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
export interface AppointmentData {
  id: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  time: string;
  tokenNumber: number;
  currentToken: number;
  status: 'upcoming' | 'active' | 'completed' | 'canceled';
}

interface AppointmentCardProps {
  appointment: AppointmentData;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const getStatusColor = () => {
    switch (appointment.status) {
      case 'upcoming':
        return 'bg-blue-500';
      case 'active':
        return 'bg-medical-primary';
      case 'completed':
        return 'bg-gray-500';
      case 'canceled':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getWaitingTime = () => {
    if (appointment.status === 'completed' || appointment.status === 'canceled') {
      return null;
    }
    
    const tokensAhead = appointment.tokenNumber - appointment.currentToken;
    if (tokensAhead <= 0) {
      return <span className="font-medium text-medical-primary">You're next!</span>;
    }
    
    // Assuming each patient takes about 15 minutes
    const estimatedMinutes = tokensAhead * 15;
    return <span className="font-medium">~{estimatedMinutes} minutes</span>;
  };

  return (
    <Card className="animated-card overflow-hidden">
      <div className={`h-2 ${getStatusColor()}`} />
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
            <p className="text-sm text-gray-600">{appointment.hospitalName}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-600">{appointment.date}</span>
            <span className="text-sm">{appointment.time}</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500">Your Token</div>
            <div className="text-xl font-semibold text-medical-dark">{appointment.tokenNumber}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500">Current Token</div>
            <div className="text-xl font-semibold text-medical-dark flex items-center">
              {appointment.status === 'active' && (
                <span className="blink-dot"></span>
              )}
              {appointment.currentToken}
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm">
          <span className="text-gray-500">Estimated waiting time: </span>
          {getWaitingTime()}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
