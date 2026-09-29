import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  LayoutDashboard,
  CreditCard,
  CalendarCheck2,
  Building2,
  Sparkles,
  User,
  ShieldAlert,
  Settings,
  LogOut,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PROJECT_METADATA } from '../../data/initialMockData';
import { ProjectInfoModal } from './ProjectInfoModal';

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showProjectModal, setShowProjectModal] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Membership', path: '/membership', icon: CreditCard },
    { label: 'Attendance', path: '/attendance', icon: CalendarCheck2 },
    { label: 'Facilities', path: '/facilities', icon: Building2 },
    { label: 'Subscription', path: '/subscription', icon: Sparkles },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  const adminItems = [
    { label: 'Admin Dashboard', path: '/admin', icon: ShieldAlert }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-pulse-lime/15 text-pulse-lime border border-pulse-lime/30 shadow-glow-lime'
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-pulse-card border border-pulse-lime/40 flex items-center justify-center text-pulse-lime shadow-glow-lime">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white tracking-tight flex items-center">
              Pulse<span className="text-pulse-lime">Fit</span>
            </h1>
            <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
              Health Clubs
            </p>
          </div>
        </div>
        {/* Mobile close button */}
        {isMobileOpen && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-2">
            Main Menu
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={navLinkClass}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Admin Section */}
        <div>
          <div className="px-3 flex items-center justify-between mb-2">
            <p className="text-[11px] font-bold tracking-wider uppercase text-pulse-cyan">
              Administration
            </p>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-pulse-cyan/20 text-pulse-cyan font-bold">
              PORTAL
            </span>
          </div>
          <nav className="space-y-1">
            {adminItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-pulse-cyan/15 text-pulse-cyan border border-pulse-cyan/30 shadow-glow-cyan'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 text-pulse-cyan" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Project PS023 Academic Attribution Card */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-pulse-lime tracking-wider uppercase">
              {PROJECT_METADATA.code} Project
            </span>
            <button
              onClick={() => setShowProjectModal(true)}
              className="text-[10px] text-pulse-cyan hover:underline flex items-center gap-0.5"
            >
              Details <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
          <p className="text-xs font-semibold text-slate-200">PulseFit Platform</p>
          <p className="text-[11px] text-slate-400 mt-1 truncate">
            Lead: Narasimha (2400032664)
          </p>
        </div>
      </div>

      {/* Footer / User / Logout Section */}
      <div className="p-4 border-t border-slate-800/80 space-y-2 bg-slate-950/40">
        <NavLink
          to="/profile"
          onClick={onCloseMobile}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="text-xs font-medium">Settings & Preferences</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-xs font-semibold"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 z-30 bg-slate-950/95 border-r border-slate-800/80 backdrop-blur-xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Responsive Overlay) */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={onCloseMobile}
          />
          {/* Drawer Content */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-950 border-r border-slate-800 z-10 shadow-2xl animate-slide-right">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Project Info Modal */}
      <ProjectInfoModal isOpen={showProjectModal} onClose={() => setShowProjectModal(false)} />
    </>
  );
};
