import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { Building2, TrendingUp } from 'lucide-react';

export const FacilityUsageChart = ({ data = [] }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass-card bg-slate-900/95 border border-slate-700/80 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{item.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Daily Check-ins:</span>
            <span className="font-bold text-pulse-cyan">{item.checkins}</span>
          </div>
          <p className="text-slate-400 text-[11px] mt-1">
            Capacity: {item.checkins} / {item.capacity} ({item.utilization}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const colors = ['#10f59a', '#38bdf8', '#a855f7', '#f59e0b'];

  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-pulse-cyan" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Facility Attendance Analytics
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time daily footfall comparison across club branches
          </p>
        </div>
        <span className="text-xs font-mono text-pulse-cyan bg-pulse-cyan/10 px-2.5 py-1 rounded-lg border border-pulse-cyan/20">
          Peak Hour: 6:00 PM
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#1e293b' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="checkins" radius={[8, 8, 0, 0]} maxBarSize={48}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        {data.map((fac, idx) => (
          <div key={idx} className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <p className="text-slate-400 text-[11px] truncate">{fac.name}</p>
            <p className="text-sm font-bold text-white mt-0.5">{fac.checkins} check-ins</p>
            <span className="text-[10px] text-pulse-lime font-mono">{fac.utilization}% load</span>
          </div>
        ))}
      </div>
    </div>
  );
};
