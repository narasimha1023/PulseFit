import React from 'react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { AlertTriangle, Send, Mail } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ExpiringMembersTable = ({ members = [] }) => {
  const { showToast } = useToast();

  const handleSendReminder = (memberName, email) => {
    showToast(`Automated renewal reminder dispatched to ${memberName} (${email})`, 'info');
  };

  const getStatusBadge = (statusType, status) => {
    switch (statusType) {
      case 'active':
        return <Badge variant="emerald" size="xs">Active</Badge>;
      case 'expiring':
        return <Badge variant="amber" size="xs">Expiring Soon</Badge>;
      case 'expired':
        return <Badge variant="rose" size="xs">Expired</Badge>;
      default:
        return <Badge variant="neutral" size="xs">{status}</Badge>;
    }
  };

  return (
    <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-pulse-amber" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Subscription Expiry Watchlist
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Active
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Expiring Soon
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Expired
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800">
            <tr>
              <th className="px-5 py-3.5">Member</th>
              <th className="px-5 py-3.5">Plan</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Due Date</th>
              <th className="px-5 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-5 py-3.5 font-semibold text-white whitespace-nowrap">
                  <div>
                    <p className="text-sm font-bold text-white">{member.name}</p>
                    <p className="text-[11px] text-slate-400">{member.email}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <span className="font-semibold text-slate-200">{member.plan}</span>
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  {getStatusBadge(member.statusType, member.status)}
                </td>
                <td className="px-5 py-3.5 font-mono text-pulse-amber whitespace-nowrap">
                  {member.renewalDate}
                </td>
                <td className="px-5 py-3.5 text-right whitespace-nowrap">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Send}
                    onClick={() => handleSendReminder(member.name, member.email)}
                  >
                    Send Reminder
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
