import React from 'react';
import { Badge } from './Badge';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeVariant = 'lime',
  trend,
  trendPositive = true,
  accentColor = 'lime',
  onClick
}) => {
  const accentBorder = {
    lime: 'hover:border-pulse-lime/40 group-hover:shadow-glow-lime',
    cyan: 'hover:border-pulse-cyan/40 group-hover:shadow-glow-cyan',
    amber: 'hover:border-amber-500/40',
    purple: 'hover:border-purple-500/40'
  };

  const iconBg = {
    lime: 'bg-pulse-lime/10 text-pulse-lime border-pulse-lime/20',
    cyan: 'bg-pulse-cyan/10 text-pulse-cyan border-pulse-cyan/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  };

  return (
    <div
      onClick={onClick}
      className={`glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden transition-all duration-300 border border-slate-800 ${
        onClick ? 'cursor-pointer' : ''
      } ${accentBorder[accentColor] || accentBorder.lime} group`}
    >
      {/* Subtle background glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-slate-800/40 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {value}
            </h3>
            {badge && (
              <Badge variant={badgeVariant} size="sm">
                {badge}
              </Badge>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
              iconBg[accentColor] || iconBg.lime
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10">
          <span>{subtitle}</span>
          {trend && (
            <span
              className={`font-semibold flex items-center gap-0.5 ${
                trendPositive ? 'text-pulse-lime' : 'text-rose-400'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
