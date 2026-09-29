import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-pulse-lime text-slate-950 hover:bg-pulse-limeHover focus:ring-pulse-lime shadow-lg shadow-pulse-lime/20 hover:shadow-pulse-lime/30 font-bold',
    secondary:
      'bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 border border-slate-700/80 hover:border-slate-600 focus:ring-slate-400',
    outline:
      'bg-transparent hover:bg-pulse-lime/10 text-pulse-lime border border-pulse-lime/50 hover:border-pulse-lime focus:ring-pulse-lime',
    outlineCyan:
      'bg-transparent hover:bg-pulse-cyan/10 text-pulse-cyan border border-pulse-cyan/50 hover:border-pulse-cyan focus:ring-pulse-cyan',
    cyan:
      'bg-pulse-cyan text-slate-950 hover:bg-pulse-cyanHover focus:ring-pulse-cyan shadow-lg shadow-pulse-cyan/20 font-bold',
    danger:
      'bg-rose-600/90 text-white hover:bg-rose-600 focus:ring-rose-500 shadow-lg shadow-rose-600/20',
    ghost:
      'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white focus:ring-slate-500'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-4 py-2.5 gap-2 rounded-xl',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-xl font-bold tracking-wide'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
      {!isLoading && IconRight && <IconRight className="w-4 h-4 shrink-0" />}
    </button>
  );
};
