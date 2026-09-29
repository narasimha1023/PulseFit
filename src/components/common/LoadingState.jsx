import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Loading PulseFit data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-8 text-center">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-2 border-pulse-lime/20 border-t-pulse-lime animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-pulse-lime animate-spin" />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-400 mt-4 tracking-wide">{message}</p>
    </div>
  );
};
