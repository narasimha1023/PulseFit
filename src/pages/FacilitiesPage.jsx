import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { FacilityCard } from '../components/facilities/FacilityCard';
import { FacilityDetailModal } from '../components/facilities/FacilityDetailModal';
import { Building2, Sparkles, MapPin, Compass } from 'lucide-react';

export const FacilitiesPage = () => {
  const { facilities, performCheckIn } = useFitness();
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleViewDetails = (facility) => {
    setSelectedFacility(facility);
    setIsDetailOpen(true);
  };

  const handleQuickCheckIn = (facilityName) => {
    performCheckIn(facilityName);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-pulse-lime" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Facilities
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore world-class training amenities, recovery zones, and wellness studios available with your PulseFit membership.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 px-3.5 py-2 rounded-xl border border-slate-800">
          <MapPin className="w-4 h-4 text-pulse-cyan" />
          <span>Home Club: PulseFit Downtown Campus</span>
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <FacilityCard
            key={facility.id}
            facility={facility}
            onViewDetails={handleViewDetails}
            onQuickCheckIn={handleQuickCheckIn}
          />
        ))}
      </div>

      {/* Facility Detail Modal */}
      <FacilityDetailModal
        facility={selectedFacility}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onCheckIn={handleQuickCheckIn}
      />
    </div>
  );
};
