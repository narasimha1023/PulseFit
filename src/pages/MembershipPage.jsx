import React, { useState } from 'react';
import { MEMBERSHIP_PLANS } from '../data/initialMockData';
import { MembershipCard } from '../components/membership/MembershipCard';
import { ChoosePlanModal } from '../components/membership/ChoosePlanModal';
import { useFitness } from '../context/FitnessContext';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const MembershipPage = () => {
  const { subscription } = useFitness();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pulse-lime/10 border border-pulse-lime/30 text-pulse-lime text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Flexible Membership Tiers
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Choose Your Membership
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Unlock unlimited multi-facility access, premium coaching, and cutting-edge fitness amenities tailored to your lifestyle.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-4">
        {MEMBERSHIP_PLANS.map((plan) => {
          const isCurrent =
            subscription?.tier?.toLowerCase() === plan.name.toLowerCase() ||
            subscription?.planId?.toLowerCase() === plan.id.toLowerCase();

          return (
            <MembershipCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={isCurrent}
              onSelectPlan={handleSelectPlan}
            />
          );
        })}
      </div>

      {/* Feature Comparison Guarantee */}
      <div className="p-6 rounded-3xl glass-card bg-slate-900/60 border border-slate-800 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pulse-lime/10 text-pulse-lime border border-pulse-lime/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">No Lock-in Contracts</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Upgrade, downgrade, or pause your membership anytime without cancellation fees.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pulse-cyan/10 text-pulse-cyan border border-pulse-cyan/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Turnstile Turnkey Access</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Seamless digital NFC check-in across all 6 club facilities in real-time.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Multi-Club Reciprocity</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Work out at City Center, Downtown, or Elite clubs with single pass credentials.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ChoosePlanModal
        plan={selectedPlan}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
