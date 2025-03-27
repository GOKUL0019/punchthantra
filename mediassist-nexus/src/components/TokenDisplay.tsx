
import React from 'react';

interface TokenDisplayProps {
  tokenNumber: number;
  currentToken: number;
  isActive?: boolean;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ 
  tokenNumber, 
  currentToken, 
  isActive = false 
}) => {
  const isNext = tokenNumber === currentToken + 1;
  const isPassed = tokenNumber <= currentToken;
  
  // Calculate estimated wait time (15 min per token)
  const tokensAhead = Math.max(0, tokenNumber - currentToken);
  const estimatedMinutes = tokensAhead * 15;
  
  const getEstimatedTime = () => {
    if (isPassed) {
      return <span className="text-gray-500">Completed</span>;
    }
    
    if (isNext) {
      return <span className="text-medical-primary font-medium">You're next!</span>;
    }
    
    const hours = Math.floor(estimatedMinutes / 60);
    const minutes = estimatedMinutes % 60;
    
    if (hours > 0) {
      return (
        <span className="text-gray-700">
          ~{hours}h {minutes > 0 ? `${minutes}m` : ''}
        </span>
      );
    }
    
    return <span className="text-gray-700">~{minutes} min</span>;
  };
  
  return (
    <div className={`
      p-4 rounded-xl border transition-all
      ${isPassed ? 'bg-gray-100 border-gray-200' : 'bg-white border-gray-200'}
      ${isActive ? 'shadow-md border-medical-primary' : 'shadow-sm'}
    `}>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-500">Token</span>
          <div className="text-2xl font-bold">
            {isActive && <span className="blink-dot"></span>}
            {tokenNumber}
          </div>
        </div>
        
        <div className="text-right">
          <span className="text-xs text-gray-500">Estimated</span>
          <div className="text-sm">{getEstimatedTime()}</div>
        </div>
      </div>
    </div>
  );
};

export default TokenDisplay;
