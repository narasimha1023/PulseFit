import React from 'react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Clock, Users, MapPin, ArrowRight } from 'lucide-react';

export const FacilityCard = ({ facility, onViewDetails, onQuickCheckIn }) => {
  const isOpen = facility.status === 'Open';

  return (
    <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group">
      {/* Top Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={facility.image}
          alt={facility.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Live Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={isOpen ? 'emerald' : 'rose'} size="xs">
            {isOpen ? 'Open Now' : 'Closed'}
          </Badge>
        </div>

        {/* Capacity / Hours bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
          <span className="flex items-center gap-1 font-mono bg-slate-950/70 px-2 py-0.5 rounded-md border border-slate-800">
            <Clock className="w-3 h-3 text-pulse-lime" />
            {facility.hours}
          </span>
          <span className="flex items-center gap-1 font-medium bg-slate-950/70 px-2 py-0.5 rounded-md border border-slate-800">
            <Users className="w-3 h-3 text-pulse-cyan" />
            {facility.capacityPct}% Occupancy
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-lg font-bold text-white group-hover:text-pulse-lime transition-colors">
              {facility.name}
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            {facility.description}
          </p>

          {/* Key Amenities */}
          {facility.features && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {facility.features.slice(0, 2).map((feat, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                >
                  {feat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => onViewDetails(facility)}
          >
            View Details
          </Button>
          {onQuickCheckIn && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickCheckIn(facility.name)}
              title="Quick Check-In Here"
            >
              Check-In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
