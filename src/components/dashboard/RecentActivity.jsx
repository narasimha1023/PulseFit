import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { Dumbbell, CreditCard, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '../common/Badge';

export const RecentActivity = () => {
  const { recentActivity } = useFitness();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'checkin':
        return <CheckCircle2 className="w-4 h-4 text-pulse-lime" />;
      case 'renewal':
        return <CreditCard className="w-4 h-4 text-pulse-cyan" />;
      case 'plan':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'visit':
      default:
        return <Dumbbell className="w-4 h-4 text-amber-400" />;
    }
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case 'checkin':
        return 'lime';
      case 'renewal':
        return 'cyan';
      case 'plan':
        return 'purple';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-pulse-lime" />
          <h3 className="text-base font-bold text-white tracking-tight">Recent Activity</h3>
        </div>
        <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
          Live Log
        </span>
      </div>

      <div className="space-y-3.5 flex-1 overflow-y-auto">
        {recentActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 transition-all group"
          >
            <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/80 group-hover:scale-105 transition-transform shrink-0 mt-0.5">
              {getActivityIcon(activity.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {activity.title}
                </h4>
                <Badge variant={getBadgeVariant(activity.type)} size="xs">
                  {activity.badge}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 leading-snug">{activity.description}</p>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
