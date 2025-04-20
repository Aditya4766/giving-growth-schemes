
import React from 'react';
import { cn } from '@/lib/utils';

const ProgressBar = ({ current, target, className }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>${current.toLocaleString()}</span>
        <span>Goal: ${target.toLocaleString()}</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            percentage >= 100 ? "bg-green-soft" : "bg-purple"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-right text-xs text-gray-500 mt-1">
        {percentage}% funded
      </div>
    </div>
  );
};

export default ProgressBar;
