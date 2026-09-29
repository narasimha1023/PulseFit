import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { QrCode, CreditCard, RefreshCw, CalendarCheck2 } from 'lucide-react';

export const QuickActions = ({ onOpenCheckIn, onOpenRenew }) => {
  const navigate = useNavigate();

  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Quick Actions
        </h3>
        <span className="text-[11px] text-pulse-lime font-medium">Instant Shortcuts</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Check In Action */}
        <button
          onClick={onOpenCheckIn}
          className="p-4 rounded-xl bg-gradient-to-br from-pulse-lime/20 to-pulse-lime/5 hover:from-pulse-lime/30 hover:to-pulse-lime/10 border border-pulse-lime/40 text-left transition-all group cursor-pointer shadow-lg shadow-pulse-lime/5 hover:shadow-pulse-lime/20"
        >
          <div className="w-10 h-10 rounded-xl bg-pulse-lime text-slate-950 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform font-bold">
            <QrCode className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-white group-hover:text-pulse-lime transition-colors">
            Check In
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Turnstile / Scanner</p>
        </button>

        {/* View Membership */}
        <button
          onClick={() => navigate('/membership')}
          className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 text-left transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-700/80 text-pulse-cyan flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-pulse-cyan transition-colors">
            View Membership
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Plans & Benefits</p>
        </button>

        {/* Renew Plan */}
        <button
          onClick={onOpenRenew}
          className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 text-left transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-700/80 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
            Renew Plan
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Extend Access</p>
        </button>

        {/* View Attendance */}
        <button
          onClick={() => navigate('/attendance')}
          className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 text-left transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-700/80 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <CalendarCheck2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
            View Attendance
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Logs & History</p>
        </button>
      </div>
    </div>
  );
};
