
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';

interface PatientSignupProps {
  onToggleLogin: () => void;
}

const PatientSignup: React.FC<PatientSignupProps> = ({ onToggleLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.age || !formData.gender || !formData.phone || !formData.email || !formData.password) {
      return;
    }
    
    // In a real app, this would handle user creation
    // For now, just store in localStorage and navigate
    localStorage.setItem('userType', 'patient');
    localStorage.setItem('patientData', JSON.stringify(formData));
    navigate('/patient-dashboard');
  };

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Patient Registration
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
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-1">
              Age
            </label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="Your age"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div>
            <label htmlFor="gender" className="block text-sm font-medium mb-1">
              Gender
            </label>
            <Select onValueChange={handleGenderChange} value={formData.gender}>
              <SelectTrigger className="form-input">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
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

export default PatientSignup;
