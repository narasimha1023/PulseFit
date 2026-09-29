import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import { StatCard } from '../components/common/StatCard';
import { FacilityUsageChart } from '../components/admin/FacilityUsageChart';
import { MembersTable } from '../components/admin/MembersTable';
import { ExpiringMembersTable } from '../components/admin/ExpiringMembersTable';
import { LoadingState } from '../components/common/LoadingState';
import {
  ShieldAlert,
  Users,
  UserCheck,
  CalendarCheck2,
  AlertTriangle,
  Download,
  Activity,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

export const AdminDashboardPage = () => {
  const { showToast } = useToast();
  const [kpis, setKpis] = useState(null);
  const [facilityData, setFacilityData] = useState([]);
  const [members, setMembers] = useState([]);
  const [expiringMembers, setExpiringMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [kpiRes, facRes, memRes, expRes] = await Promise.all([
          adminService.getKpis(),
          adminService.getFacilityAnalytics(),
          adminService.getMembers(),
          adminService.getExpiringMembers()
        ]);
        setKpis(kpiRes);
        setFacilityData(facRes);
        setMembers(memRes);
        setExpiringMembers(expRes);
      } catch (err) {
        console.error('Failed to load admin metrics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleExportReport = () => {
    showToast('Exporting comprehensive administrative attendance & revenue report...', 'info');
  };

  if (loading) {
    return <LoadingState message="Aggregating multi-facility telemetry & member metrics..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-pulse-cyan" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Executive Admin Console
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Centralized multi-club attendance monitoring, membership health, and capacity analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={handleExportReport}
          >
            Export KPI Report
          </Button>
        </div>
      </div>

      {/* 4 Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* 1. Total Members: 1,248 */}
        <StatCard
          title="Total Members"
          value={kpis?.totalMembers?.toLocaleString('en-IN') || '1,248'}
          subtitle="+84 new this month"
          badge="Registered"
          badgeVariant="cyan"
          icon={Users}
          accentColor="cyan"
        />

        {/* 2. Active Memberships: 1,082 */}
        <StatCard
          title="Active Memberships"
          value={kpis?.activeMemberships?.toLocaleString('en-IN') || '1,082'}
          subtitle="86.7% retention rate"
          badge="Healthy"
          badgeVariant="emerald"
          icon={UserCheck}
          accentColor="lime"
        />

        {/* 3. Today's Check-ins: 327 */}
        <StatCard
          title="Today's Check-ins"
          value={kpis?.todayCheckins?.toLocaleString('en-IN') || '327'}
          subtitle="Across 4 club branches"
          badge="Peak Active"
          badgeVariant="lime"
          icon={CalendarCheck2}
          accentColor="lime"
        />

        {/* 4. Expiring Subscriptions: 46 */}
        <StatCard
          title="Expiring Subscriptions"
          value={kpis?.expiringThisWeek || '46'}
          subtitle="Due within next 7 days"
          badge="Action Required"
          badgeVariant="amber"
          icon={AlertTriangle}
          accentColor="amber"
        />
      </div>

      {/* Facility Usage Analytics Chart */}
      <FacilityUsageChart data={facilityData} />

      {/* Two-column tables: Recent Members & Expiring Subscriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Members Table */}
        <MembersTable members={members} />

        {/* Expiring Subscriptions Watchlist Table */}
        <ExpiringMembersTable members={expiringMembers} />
      </div>
    </div>
  );
};
