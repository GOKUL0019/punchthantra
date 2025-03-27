
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from 'react-router-dom';

interface DoctorSignupProps {
  onToggleLogin: () => void;
}

const DoctorSignup: React.FC<DoctorSignupProps> = ({ onToggleLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    speciality: '',
    hospital: '',
    email: '',
    password: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!formData.name || !formData.speciality || !formData.hospital || !formData.email || !formData.password) {
      return;
    }
    
    
    localStorage.setItem('userType', 'doctor');
    localStorage.setItem('doctorData', JSON.stringify(formData));
    navigate('/doctor-dashboard');
  };

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Doctor Registration
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div>
          <label htmlFor="speciality" className="block text-sm font-medium mb-1">
            Speciality
          </label>
          <Input
            id="speciality"
            name="speciality"
            type="text"
            placeholder="Your medical speciality"
            value={formData.speciality}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div>
          <label htmlFor="hospital" className="block text-sm font-medium mb-1">
            Hospital Details
          </label>
          <Textarea
            id="hospital"
            name="hospital"
            placeholder="Enter your hospital name and address"
            value={formData.hospital}
            onChange={handleChange}
            className="form-input min-h-[80px]"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full primary-button"
          >
            Create Account
          </Button>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={onToggleLogin} 
              className="text-medical-primary hover:underline font-medium focus:outline-none"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default DoctorSignup;
