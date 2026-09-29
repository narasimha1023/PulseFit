import React, { useState } from 'react';
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
import { WEEKLY_ATTENDANCE_DATA } from '../../data/initialMockData';
import { Calendar, TrendingUp } from 'lucide-react';

export const AttendanceChart = () => {
  const [activeRange, setActiveRange] = useState('weekly');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card bg-slate-900/95 border border-slate-700/80 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{data.fullDay || label}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pulse-lime" />
            <span className="text-slate-300">Visits:</span>
            <span className="font-bold text-pulse-lime">{data.visits}</span>
          </div>
          {data.duration > 0 && (
            <p className="text-slate-400 text-[11px] mt-1">Duration: {data.duration} mins</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pulse-lime" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Weekly Attendance Breakdown
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Mon — Sun attendance frequency & workout check-ins
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-700/60">
            <TrendingUp className="w-3.5 h-3.5 text-pulse-lime" />
            Consistency: 71%
          </span>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={WEEKLY_ATTENDANCE_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="limeBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10f59a" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#10f59a" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="inactiveBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#334155" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#1e293b" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="day"
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
              allowDecimals={false}
              domain={[0, 2]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="visits" radius={[8, 8, 0, 0]} maxBarSize={45}>
              {WEEKLY_ATTENDANCE_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.visits > 0 ? 'url(#limeBarGradient)' : 'url(#inactiveBarGradient)'}
                  stroke={entry.visits > 0 ? '#10f59a' : 'transparent'}
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-pulse-lime shadow-glow-lime" />
            <span>Attended (1 Visit)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-700" />
            <span>Rest Day (0 Visits)</span>
          </div>
        </div>
        <span className="text-slate-400 font-mono text-[11px]">
          Target: 4-5 Sessions / week
        </span>
      </div>
    </div>
  );
};
