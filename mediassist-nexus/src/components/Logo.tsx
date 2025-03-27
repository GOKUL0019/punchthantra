
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className={`font-bold ${sizeClasses[size]} ${className}`}>
      <span className="text-medical-dark">Health</span>
      <span className="text-medical-primary">Sync</span>
    </div>
  );
};

export default Logo;
