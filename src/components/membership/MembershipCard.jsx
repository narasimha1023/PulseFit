import React from 'react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Check, Sparkles, Zap } from 'lucide-react';

export const MembershipCard = ({ plan, isCurrentPlan, onSelectPlan }) => {
  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border ${
        plan.popular
          ? 'glass-card bg-slate-900/90 border-pulse-lime/60 shadow-glow-lime hover:border-pulse-lime'
          : 'glass-card bg-slate-900/60 border-slate-800 hover:border-slate-700'
      } group`}
    >
      {/* Popular Ribbon / Badge */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-pulse-lime text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-glow-lime">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>POPULAR</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {plan.name}
          </h3>
          {isCurrentPlan && (
            <Badge variant="lime" size="xs">
              Current Plan
            </Badge>
          )}
        </div>

        <p className="text-xs text-slate-400 min-h-[36px] mb-6 leading-relaxed">
          {plan.description}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-800">
          <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {plan.price}
          </span>
          <span className="text-xs text-slate-400 font-medium">{plan.period}</span>
        </div>

        {/* Feature List */}
        <div className="space-y-3 mb-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Included Privileges:
          </p>
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  plan.popular
                    ? 'bg-pulse-lime/20 text-pulse-lime'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Check className="w-3 h-3" />
              </div>
              <span className="leading-snug">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div>
        <Button
          variant={plan.popular ? 'primary' : 'secondary'}
          size="lg"
          className="w-full"
          disabled={isCurrentPlan}
          onClick={() => onSelectPlan(plan)}
        >
          {isCurrentPlan ? 'Current Active Plan' : plan.buttonText || 'Choose Plan'}
        </Button>
      </div>
    </div>
  );
};
