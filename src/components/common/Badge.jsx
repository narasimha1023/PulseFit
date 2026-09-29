import React from 'react';

export const Badge = ({ children, variant = 'neutral', size = 'md', className = '' }) => {
  const variantStyles = {
    active: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    lime: 'bg-pulse-lime/15 text-pulse-lime border border-pulse-lime/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    rose: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    cyan: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700'
  };

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 rounded-full font-medium',
    sm: 'text-xs px-2.5 py-0.5 rounded-full font-medium tracking-wide',
    md: 'text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider',
    lg: 'text-sm px-3.5 py-1.5 rounded-full font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 transition-colors ${
        variantStyles[variant] || variantStyles.neutral
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
};
