import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFitness } from '../context/FitnessContext';
import { subscriptionService } from '../services/subscriptionService';
import { SubscriptionCard } from '../components/subscription/SubscriptionCard';
import { RenewalHistoryList } from '../components/subscription/RenewalHistoryList';
import { RenewModal } from '../components/subscription/RenewModal';
import { Sparkles, Shield, Receipt } from 'lucide-react';

export const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { subscription } = useFitness();
  const [renewalHistory, setRenewalHistory] = useState([]);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await subscriptionService.getRenewalHistory();
      setRenewalHistory(history);
    };
    fetchHistory();
  }, [subscription]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pulse-lime" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Subscription
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your active health club tier, track billing cycles, and review historical invoices.
        </p>
      </div>

      {/* Large Hero Membership Card */}
      <SubscriptionCard
        subscription={subscription}
        onOpenRenewModal={() => setIsRenewModalOpen(true)}
        onChangePlan={() => navigate('/membership')}
      />

      {/* Renewal History Section */}
      <RenewalHistoryList history={renewalHistory} />

      {/* Renew Modal Dialog */}
      <RenewModal
        isOpen={isRenewModalOpen}
        onClose={() => setIsRenewModalOpen(false)}
      />
    </div>
  );
};
