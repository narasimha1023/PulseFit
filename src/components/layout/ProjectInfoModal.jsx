import React from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { PROJECT_METADATA } from '../../data/initialMockData';
import { Award, Users, Layers, Server, ShieldCheck, Database, Cpu } from 'lucide-react';

export const ProjectInfoModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={PROJECT_METADATA.company}
      subtitle={`Project ID: ${PROJECT_METADATA.code}`}
      icon={Award}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Project Header Info */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="lime" size="sm">
              {PROJECT_METADATA.code}
            </Badge>
            <Badge variant="cyan" size="sm">
              FRONTEND PROTOTYPE
            </Badge>
            <Badge variant="purple" size="sm">
              READY FOR SPRING BOOT
            </Badge>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {PROJECT_METADATA.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 italic">
            "{PROJECT_METADATA.tagline}"
          </p>
        </div>

        {/* Project Team */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-pulse-lime" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Project Development Team
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PROJECT_METADATA.team.map((member, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-pulse-lime/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-pulse-lime/10 text-pulse-lime border border-pulse-lime/30 flex items-center justify-center font-bold text-xs mb-2">
                  {member.name.charAt(0)}
                </div>
                <h5 className="font-bold text-sm text-white">{member.name}</h5>
                <p className="text-xs font-mono text-pulse-cyan mt-0.5">{member.roll}</p>
                <p className="text-[11px] text-slate-400 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Microservices Architecture Diagram */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-pulse-cyan" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Target Spring Boot Microservices Architecture
            </h4>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {/* Layer 1: Client */}
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-between text-slate-200">
              <span className="flex items-center gap-2 text-pulse-lime font-bold">
                <Cpu className="w-3.5 h-3.5" /> Client Tier
              </span>
              <span className="text-[11px] text-slate-400">React + Vite + Tailwind SPA</span>
            </div>

            <div className="text-center text-slate-500 text-xs">↓ REST API / JSON</div>

            {/* Layer 2: API Gateway */}
            <div className="p-2 rounded-lg bg-pulse-cyan/10 border border-pulse-cyan/30 flex items-center justify-between text-pulse-cyan">
              <span className="flex items-center gap-2 font-bold">
                <Server className="w-3.5 h-3.5" /> Spring Cloud API Gateway (Port 8080)
              </span>
              <span className="text-[11px] text-slate-400">JWT Filter & Route Forwarding</span>
            </div>

            <div className="text-center text-slate-500 text-xs">↓ Service Discovery & Load Balancing</div>

            {/* Layer 3: Microservices Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-center">
                <p className="font-bold text-[11px] text-white">Auth Service</p>
                <p className="text-[10px] text-slate-400">JWT & Security</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-center">
                <p className="font-bold text-[11px] text-white">Member Service</p>
                <p className="text-[10px] text-slate-400">Profiles & Data</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-center">
                <p className="font-bold text-[11px] text-white">Subscription</p>
                <p className="text-[10px] text-slate-400">Plans & Billing</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-center">
                <p className="font-bold text-[11px] text-white">Attendance</p>
                <p className="text-[10px] text-slate-400">Check-ins & Logs</p>
              </div>
            </div>

            <div className="text-center text-slate-500 text-xs">↓ Service Registry & Storage</div>

            {/* Layer 4: Eureka & MySQL */}
            <div className="flex gap-2">
              <div className="flex-1 p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center gap-1.5 text-purple-300 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> Netflix Eureka Server
              </div>
              <div className="flex-1 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-1.5 text-emerald-300 font-bold text-[11px]">
                <Database className="w-3.5 h-3.5" /> MySQL Microservice DBs
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </Modal>
  );
};
