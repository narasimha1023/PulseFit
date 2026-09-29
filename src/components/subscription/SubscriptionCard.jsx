import React from 'react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Sparkles, Calendar, CreditCard, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';

export const SubscriptionCard = ({
  subscription,
  onOpenRenewModal,
  onChangePlan
}) => {
  if (!subscription) return null;

  // Calculate progress percent
  const totalDays = subscription.durationTotalDays || 30;
  const elapsedDays = subscription.daysElapsed || 6;
  const remainingDays = Math.max(0, totalDays - elapsedDays);
  const progressPct = Math.min(100, Math.round((elapsedDays / totalDays) * 100));

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-pulse-surface to-slate-950 border border-slate-700/80 shadow-2xl overflow-hidden group">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-pulse-lime/10 rounded-full blur-3xl pointer-events-none group-hover:bg-pulse-lime/15 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pulse-cyan/10 rounded-full blur-3xl pointer-events-none" />

      {/* Holographic membership watermark */}
      <div className="absolute right-6 top-8 text-slate-800/40 text-7xl font-black italic select-none pointer-events-none tracking-tighter">
        PULSEFIT
      </div>

      <div className="relative z-10">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-pulse-lime/10 border border-pulse-lime/30 flex items-center justify-center text-pulse-lime shadow-glow-lime">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {subscription.planName || 'PREMIUM PLAN'}
                </h2>
                <Badge variant="lime" size="sm">
                  {subscription.status || 'ACTIVE'}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                All-Access Multi-Facility Digital Pass
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Membership Fee
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {subscription.currency}
              {subscription.price?.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-slate-400 font-normal">
                / {subscription.billingCycle === 'annual' ? 'year' : 'month'}
              </span>
            </div>
          </div>
        </div>

        {/* Dates Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Start Date
            </span>
            <p className="text-sm sm:text-base font-bold text-white mt-1">
              {subscription.startDate || '15 Sep 2026'}
            </p>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-pulse-lime" /> Renewal Date
            </span>
            <p className="text-sm sm:text-base font-bold text-pulse-lime mt-1 font-mono">
              {subscription.renewalDate || '15 Oct 2026'}
            </p>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-pulse-cyan" /> Payment Method
            </span>
            <p className="text-xs font-semibold text-slate-200 mt-1 truncate">
              {subscription.paymentMethod || 'UPI AutoPay (Verified)'}
            </p>
          </div>
        </div>

        {/* Duration Progress Bar */}
        <div className="my-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-300 font-medium">
              Membership Duration Cycle
            </span>
            <span className="text-pulse-lime font-mono font-bold">
              {remainingDays} days remaining ({progressPct}% elapsed)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pulse-lime via-pulse-cyan to-pulse-lime shadow-glow-lime transition-all duration-700"
              style={{ width: `${Math.max(8, progressPct)}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800/80">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={onOpenRenewModal}
            icon={RefreshCw}
          >
            Renew Membership
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={onChangePlan}
            iconRight={ArrowRight}
          >
            Change Plan
          </Button>

          <div className="sm:ml-auto flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-pulse-lime shrink-0" />
            <span>Encrypted Member Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
};
