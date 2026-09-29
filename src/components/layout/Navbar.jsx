import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, ChevronDown, User, Shield, Info, LogOut } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { ProjectInfoModal } from './ProjectInfoModal';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProjectInfo, setShowProjectInfo] = useState(false);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Membership', path: '/membership' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Subscription', path: '/subscription' },
    { label: 'Profile', path: '/profile' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pulse-card to-slate-900 border border-pulse-lime/40 flex items-center justify-center text-pulse-lime group-hover:shadow-glow-lime transition-all duration-300">
                <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
                  Pulse<span className="text-pulse-lime">Fit</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-slate-400 font-semibold -mt-1">
                  Health Clubs
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-pulse-lime/15 text-pulse-lime border border-pulse-lime/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Project Accreditation Badge / Info button */}
            <button
              onClick={() => setShowProjectInfo(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-pulse-lime border border-slate-700/60 text-xs font-semibold transition-colors"
              title="Project PS023 Info & Team"
            >
              <Info className="w-3.5 h-3.5 text-pulse-cyan" />
              <span>PS023 Info</span>
            </button>

            {/* Notifications Dropdown */}
            <NotificationDropdown />

            {/* User Profile Pill */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all focus:outline-none focus:ring-2 focus:ring-pulse-lime cursor-pointer"
              >
                <img
                  src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                  alt={user?.name || "User Avatar"}
                  className="w-8 h-8 rounded-lg object-cover border border-pulse-lime/40"
                />
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight">
                    {user?.name || 'Narasimha Reddy'}
                  </span>
                  <span className="text-[10px] text-pulse-lime font-medium">
                    {user?.status || 'ACTIVE'} Member
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl glass-card bg-slate-900/95 border border-slate-700/80 shadow-2xl z-50 overflow-hidden animate-slide-down"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <div className="p-3 border-b border-slate-800">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-xs font-bold text-white truncate">{user?.email || 'narasimha@example.com'}</p>
                    <p className="text-[10px] font-mono text-pulse-cyan mt-0.5">ID: {user?.memberId || 'PF-2400032664'}</p>
                  </div>
                  <div className="p-1.5">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4 text-pulse-lime" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Shield className="w-4 h-4 text-pulse-cyan" />
                      <span>Admin Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowProjectInfo(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors text-left"
                    >
                      <Info className="w-4 h-4 text-purple-400" />
                      <span>Project PS023 Specs</span>
                    </button>
                    <div className="my-1 border-t border-slate-800" />
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Project Info Modal */}
      <ProjectInfoModal isOpen={showProjectInfo} onClose={() => setShowProjectInfo(false)} />
    </>
  );
};
