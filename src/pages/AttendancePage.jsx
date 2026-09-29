import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { StatCard } from '../components/common/StatCard';
import { AttendanceTable } from '../components/attendance/AttendanceTable';
import { CheckInModal } from '../components/attendance/CheckInModal';
import {
  CalendarCheck2,
  Calendar,
  Clock,
  Dumbbell,
  QrCode,
  Sparkles,
  Award
} from 'lucide-react';

export const AttendancePage = () => {
  const { attendanceStats, attendanceHistory } = useFitness();
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Section: Attendance Overview & Large Check In Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheck2 className="w-5 h-5 text-pulse-lime" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Attendance Overview
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track and verify your workout visits, turnstile check-ins, and facility utilization history.
          </p>
        </div>

        {/* Large CHECK IN Button */}
        <div>
          <button
            onClick={() => setIsCheckInOpen(true)}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pulse-lime to-pulse-limeHover text-slate-950 font-black text-base uppercase tracking-wider shadow-glow-lime hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <QrCode className="w-6 h-6 stroke-[2.5]" />
            <span>CHECK IN</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Visits */}
        <StatCard
          title="Total Visits"
          value={`${attendanceStats?.totalVisits || 24}`}
          subtitle="Lifetime check-ins"
          icon={CalendarCheck2}
          accentColor="lime"
          badge="Verified"
          badgeVariant="emerald"
        />

        {/* This Month */}
        <StatCard
          title="This Month"
          value={`${attendanceStats?.thisMonth || 8}`}
          subtitle="September 2026"
          icon={Calendar}
          accentColor="cyan"
          badge="Active"
          badgeVariant="cyan"
        />

        {/* This Week */}
        <StatCard
          title="This Week"
          value={`${attendanceStats?.thisWeek || 3}`}
          subtitle="Target: 4-5 days"
          icon={Clock}
          accentColor="amber"
          badge="On Pace"
          badgeVariant="amber"
        />

        {/* Favorite Facility */}
        <StatCard
          title="Favorite Facility"
          value={attendanceStats?.favoriteFacility || 'Main Gym'}
          subtitle="65% of all sessions"
          icon={Dumbbell}
          accentColor="purple"
          badge="Top Zone"
          badgeVariant="purple"
        />
      </div>

      {/* Attendance History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Attendance History Table
            </h2>
            <p className="text-xs text-slate-400">
              Complete NFC turnstile check-in and check-out logs with duration timestamps.
            </p>
          </div>
        </div>

        <AttendanceTable records={attendanceHistory} />
      </div>

      {/* Check In Modal */}
      <CheckInModal
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
      />
    </div>
  );
};
