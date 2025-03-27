
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  History, 
  MessageCircle, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

const PatientSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('patientData');
    navigate('/');
  };
  
  const menuItems = [
    {
      path: '/patient-dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: '/appointments',
      name: 'Appointments',
      icon: <Calendar size={20} />,
    },
    {
      path: '/health-history',
      name: 'Health History',
      icon: <History size={20} />,
    },
    {
      path: '/prescriptions',
      name: 'Prescriptions',
      icon: <FileText size={20} />,
    },
    {
      path: '/chatbot',
      name: 'AI Health Assistant',
      icon: <MessageCircle size={20} />,
    },
    {
      path: '/support',
      name: 'Support',
      icon: <HelpCircle size={20} />,
    },
  ];
  
  return (
    <div className="h-screen flex flex-col border-r bg-medical-light">
      <div className="p-6">
        <Logo />
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center px-4 py-3 rounded-lg transition-colors
              ${isActive(item.path) 
                ? 'bg-medical-primary bg-opacity-10 text-medical-primary font-medium' 
                : 'text-medical-dark hover:bg-gray-100'}
            `}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 mt-auto">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center text-gray-700 hover:text-medical-dark"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default PatientSidebar;
