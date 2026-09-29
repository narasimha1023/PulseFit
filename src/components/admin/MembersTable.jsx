import React, { useState } from 'react';
import { Badge } from '../common/Badge';
import { Search, UserCheck } from 'lucide-react';

export const MembersTable = ({ members = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (statusType, statusText) => {
    switch (statusType) {
      case 'active':
        return <Badge variant="emerald" size="xs">Active</Badge>;
      case 'expiring':
        return <Badge variant="amber" size="xs">Expiring Soon</Badge>;
      case 'expired':
        return <Badge variant="rose" size="xs">Expired</Badge>;
      default:
        return <Badge variant="neutral" size="xs">{statusText}</Badge>;
    }
  };

  return (
    <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-pulse-lime" />
          <h3 className="text-base font-bold text-white tracking-tight">Recent Members</h3>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search member name or plan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pulse-lime"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800">
            <tr>
              <th className="px-5 py-3.5">Name</th>
              <th className="px-5 py-3.5">Plan</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.map((member) => (
              <tr key={member.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-5 py-3.5 font-semibold text-white whitespace-nowrap">
                  <div>
                    <p className="text-sm font-bold text-white">{member.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{member.id}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <span className="font-semibold text-slate-200">{member.plan}</span>
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  {getStatusBadge(member.statusType, member.status)}
                </td>
                <td className="px-5 py-3.5 text-right font-mono text-slate-400 whitespace-nowrap">
                  {member.joinedDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
