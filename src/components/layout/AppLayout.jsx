import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { PROJECT_METADATA } from '../../data/initialMockData';

export const AppLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pulse-bg text-slate-100 flex">
      {/* Sidebar (Desktop fixed left, Mobile drawer) */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Navbar */}
        <Navbar
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 px-4 sm:px-8 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight">PulseFit Health Clubs</span>
              <span>•</span>
              <span className="text-pulse-lime font-mono">{PROJECT_METADATA.code} Platform</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Crafted for Spring Boot Microservices Transition</span>
              <span>•</span>
              <span className="text-slate-300">T. Narasimha Reddy, V. Siddardha, B. Mahesh Babu</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
