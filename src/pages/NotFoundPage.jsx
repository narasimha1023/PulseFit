import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Activity, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-pulse-lime/10 border border-pulse-lime/30 flex items-center justify-center text-pulse-lime mb-6 shadow-glow-lime">
        <Activity className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-white tracking-tight">404 — Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md mt-2 mb-8">
        The fitness zone or page you are looking for does not exist or has been relocated.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" size="md" icon={ArrowLeft}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};
