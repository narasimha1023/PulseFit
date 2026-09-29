import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { QrCode, Building2, Clock, CheckCircle2, MapPin } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { useAuth } from '../../context/AuthContext';

export const CheckInModal = ({ isOpen, onClose }) => {
  const { facilities, performCheckIn } = useFitness();
  const { user } = useAuth();
  const [selectedFacility, setSelectedFacility] = useState('Main Gym');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Current formatted time preview
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const currentTimeString = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await performCheckIn(selectedFacility);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Facility Check-In"
      subtitle="Smart turnstile & NFC access simulator"
      icon={QrCode}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Member Preview Card */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Member Name</p>
            <p className="text-sm font-bold text-white">{user?.name || 'Narasimha Reddy'}</p>
            <p className="text-[11px] font-mono text-pulse-cyan mt-0.5">
              {user?.memberId || 'PF-2400032664'}
            </p>
          </div>
          <Badge variant="lime" size="sm">
            {user?.status || 'ACTIVE'}
          </Badge>
        </div>

        {/* Current Time Stamp */}
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-pulse-lime" />
            Check-In Timestamp
          </span>
          <span className="text-sm font-bold font-mono text-pulse-lime">
            {currentTimeString} (Live)
          </span>
        </div>

        {/* Facility Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Select Facility / Zone
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {facilities.map((fac) => {
              const isSelected = selectedFacility === fac.name;
              return (
                <button
                  type="button"
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac.name)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-pulse-lime/15 border-pulse-lime text-white shadow-glow-lime'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <p className="text-xs font-bold truncate">{fac.name}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 truncate">
                    <MapPin className="w-2.5 h-2.5" />
                    {fac.status}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
          <Button
            type="button"
            variant="ghost"
            className="w-1/3"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="w-2/3"
            isLoading={isSubmitting}
            icon={CheckCircle2}
          >
            Confirm Check-In
          </Button>
        </div>
      </form>
    </Modal>
  );
};
