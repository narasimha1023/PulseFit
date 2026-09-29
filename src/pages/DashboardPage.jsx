import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFitness } from '../context/FitnessContext';
import { StatCard } from '../components/common/StatCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { AttendanceChart } from '../components/dashboard/AttendanceChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { CheckInModal } from '../components/attendance/CheckInModal';
import { RenewModal } from '../components/subscription/RenewModal';
import { LoadingState } from '../components/common/LoadingState';
import {
  ShieldCheck,
  Award,
  CalendarCheck2,
  Calendar,
  Sparkles,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { subscription, attendanceStats, loading } = useFitness();

  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isRenewOpen, setIsRenewOpen] = useState(false);

  if (loading) {
    return <LoadingState message="Loading your fitness dashboard..." />;
  }

  const firstName = user?.name ? user.name.split(' ')[0] : 'Narasimha';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-pulse-surface to-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-pulse-lime/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-pulse-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pulse-lime/10 border border-pulse-lime/30 text-pulse-lime text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Streak: 4 Consecutive Days Active</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1">
              Here's your fitness activity overview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCheckInOpen(true)}
              className="px-5 py-3 rounded-xl bg-pulse-lime text-slate-950 hover:bg-pulse-limeHover font-extrabold text-sm shadow-glow-lime hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Instant Check In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Four Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* 1. Membership Status */}
        <StatCard
          title="Membership Status"
          value={subscription?.status || 'ACTIVE'}
          badge={subscription?.status || 'ACTIVE'}
          badgeVariant="lime"
          subtitle="Multi-Facility Pass"
          icon={ShieldCheck}
          accentColor="lime"
        />

        {/* 2. Current Plan */}
        <StatCard
          title="Current Plan"
          value={subscription?.tier || 'Premium'}
          badge="VIP Access"
          badgeVariant="cyan"
          subtitle={`₹${subscription?.price?.toLocaleString('en-IN') || '2,500'} / month`}
          icon={Award}
          accentColor="cyan"
        />

        {/* 3. Attendance */}
        <StatCard
          title="Attendance"
          value={`${attendanceStats?.totalVisits || 24} Visits`}
          badge={`+${attendanceStats?.thisWeek || 3} this week`}
          badgeVariant="emerald"
          subtitle="Top: Main Gym"
          icon={CalendarCheck2}
          accentColor="lime"
        />

        {/* 4. Next Renewal */}
        <StatCard
          title="Next Renewal"
          value={subscription?.renewalDate || '15 Oct 2026'}
          badge="AutoPay Active"
          badgeVariant="purple"
          subtitle="Axis Bank ••••4821"
          icon={Calendar}
          accentColor="purple"
        />
      </div>

      {/* Quick Actions Component */}
      <QuickActions
        onOpenCheckIn={() => setIsCheckInOpen(true)}
        onOpenRenew={() => setIsRenewOpen(true)}
      />

      {/* Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Attendance Chart (2 Columns) */}
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>

        {/* Recent Activity List (1 Column) */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Check In Modal */}
      <CheckInModal
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
      />

      {/* Renew Modal */}
      <RenewModal
        isOpen={isRenewOpen}
        onClose={() => setIsRenewOpen(false)}
      />
    </div>
  );
};
