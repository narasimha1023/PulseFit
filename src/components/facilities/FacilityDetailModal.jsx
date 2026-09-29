import React from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Building2, Clock, Users, MapPin, Dumbbell, ShieldCheck, UserCheck } from 'lucide-react';

export const FacilityDetailModal = ({ facility, isOpen, onClose, onCheckIn }) => {
  if (!facility) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={facility.name}
      subtitle={facility.tagline || 'Club Amenity Overview'}
      icon={Building2}
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Hero Image */}
        <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-700">
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <Badge variant={facility.status === 'Open' ? 'emerald' : 'rose'} size="sm">
              {facility.status === 'Open' ? 'Open Now' : 'Closed'}
            </Badge>
            <span className="text-xs bg-slate-900/80 px-2.5 py-1 rounded-md text-white font-mono">
              {facility.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed">
          {facility.description}
        </p>

        {/* Spec Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <Clock className="w-3 h-3 text-pulse-lime" /> Hours
            </span>
            <p className="text-xs font-semibold text-white mt-1">{facility.hours}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <Users className="w-3 h-3 text-pulse-cyan" /> Occupancy
            </span>
            <p className="text-xs font-semibold text-white mt-1">{facility.capacityPct}% Capacity</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-purple-400" /> Trainer on Duty
            </span>
            <p className="text-xs font-semibold text-white mt-1 truncate">
              {facility.trainerInCharge || 'Coach on Shift'}
            </p>
          </div>
        </div>

        {/* Features & Equipment */}
        {facility.features && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-pulse-lime" />
              Equipment & Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {facility.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 border border-slate-700/40 text-xs text-slate-300"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-pulse-lime shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              if (onCheckIn) onCheckIn(facility.name);
            }}
          >
            Check In at {facility.name}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
