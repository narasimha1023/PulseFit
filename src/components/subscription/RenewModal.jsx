import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { RefreshCw, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const RenewModal = ({ isOpen, onClose }) => {
  const { subscription, renewPlan } = useFitness();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!subscription) return null;

  const handleRenew = async () => {
    setIsProcessing(true);
    try {
      await renewPlan();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Renew Membership"
      subtitle="Extend your health club access instantly"
      icon={RefreshCw}
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        {/* Plan summary */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Current Plan</span>
            <Badge variant="lime" size="sm">
              {subscription.status}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-white">{subscription.planName}</h3>
          <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between">
            <span className="text-xs text-slate-300">Renewal Amount</span>
            <span className="text-xl font-extrabold text-pulse-lime font-mono">
              ₹{subscription.price?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Benefits reminder */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulse-lime shrink-0" />
            <span>Uninterrupted multi-facility access across all clubs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-pulse-lime shrink-0" />
            <span>Smart NFC & Turnstile automated check-in retained</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-pulse-cyan shrink-0" />
            <span>Secure simulated payment (100% test mode)</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
          <Button
            type="button"
            variant="ghost"
            className="w-1/3"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            className="w-2/3"
            isLoading={isProcessing}
            onClick={handleRenew}
            icon={RefreshCw}
          >
            Confirm & Pay
          </Button>
        </div>
      </div>
    </Modal>
  );
};
