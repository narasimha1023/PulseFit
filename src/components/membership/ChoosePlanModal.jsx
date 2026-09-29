import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Sparkles, Check, ShieldCheck } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const ChoosePlanModal = ({ plan, isOpen, onClose }) => {
  const { choosePlan } = useFitness();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!plan) return null;

  const handleConfirmPlan = async () => {
    setIsProcessing(true);
    try {
      await choosePlan(plan.id);
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
      title={`Confirm ${plan.name} Membership`}
      subtitle="Ready to power up your fitness journey?"
      icon={Sparkles}
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        {/* Selected Tier Preview */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white">{plan.name} TIER</h3>
            {plan.popular && (
              <Badge variant="lime" size="xs">
                POPULAR CHOICE
              </Badge>
            )}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-pulse-lime font-mono">
              {plan.price}
            </span>
            <span className="text-xs text-slate-400">{plan.period}</span>
          </div>
          <p className="text-xs text-slate-300 mt-2">{plan.description}</p>
        </div>

        {/* Feature Checklist */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Included in this tier:
          </h4>
          <div className="space-y-1.5">
            {plan.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-3.5 h-3.5 text-pulse-lime shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment simulator note */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-pulse-cyan shrink-0" />
          <span>Prototype simulator: Zero real payment will be charged.</span>
        </div>

        {/* Modal Actions */}
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
            onClick={handleConfirmPlan}
          >
            Confirm & Activate
          </Button>
        </div>
      </div>
    </Modal>
  );
};
