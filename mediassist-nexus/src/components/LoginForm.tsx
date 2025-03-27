
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  userType: 'patient' | 'doctor';
  onToggleSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ userType, onToggleSignup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      return;
    }
    
    // In a real app, this would handle authentication
    // For now, just navigate to the appropriate dashboard
    if (userType === 'patient') {
      localStorage.setItem('userType', 'patient');
      navigate('/patient-dashboard');
    } else {
      localStorage.setItem('userType', 'doctor');
      navigate('/doctor-dashboard');
    }
  };

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {userType === 'patient' ? 'Patient Login' : 'Doctor Login'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full primary-button"
          >
            Sign In
          </Button>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={onToggleSignup} 
              className="text-medical-primary hover:underline font-medium focus:outline-none"
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
