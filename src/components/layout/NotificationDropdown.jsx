import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, CheckCheck, Info, AlertTriangle, Dumbbell, Sparkles } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const NotificationDropdown = () => {
  const { notifications, unreadNotificationsCount, markNotificationAsRead, markAllNotificationsAsRead } = useFitness();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'success':
        return <Check className="w-4 h-4 text-pulse-lime shrink-0" />;
      case 'facility':
        return <Dumbbell className="w-4 h-4 text-pulse-cyan shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-sky-400 shrink-0" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors focus:outline-none focus:ring-2 focus:ring-pulse-lime"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pulse-lime text-[11px] font-extrabold text-slate-950 shadow-glow-lime animate-pulse">
            {unreadNotificationsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-card bg-slate-900/95 border border-slate-700/80 shadow-2xl z-50 overflow-hidden animate-slide-down">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-sm">Notifications</h4>
              {unreadNotificationsCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-pulse-lime/20 text-pulse-lime font-semibold">
                  {unreadNotificationsCount} new
                </span>
              )}
            </div>
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-xs text-pulse-lime hover:underline flex items-center gap-1 font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No notifications right now.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                    notif.read ? 'opacity-60 hover:opacity-90 bg-transparent' : 'bg-slate-800/40 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="text-xs font-semibold text-white truncate">{notif.title}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-pulse-lime mt-1.5 shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="p-2.5 text-center bg-slate-950/60 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-pulse-lime" />
              PulseFit Real-time Event System
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
