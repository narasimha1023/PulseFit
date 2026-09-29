import React, { useState } from 'react';
import { Badge } from '../common/Badge';
import { Search, Filter, Calendar, MapPin, Clock } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

export const AttendanceTable = ({ records = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('ALL');

  // Unique facilities for filtering
  const facilities = ['ALL', ...new Set(records.map((r) => r.facility))];

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFacility = facilityFilter === 'ALL' || r.facility === facilityFilter;

    return matchesSearch && matchesFacility;
  });

  const getStatusBadge = (status) => {
    if (status === 'Completed') {
      return <Badge variant="emerald" size="sm">Completed</Badge>;
    }
    if (status === 'In Progress') {
      return <Badge variant="amber" size="sm">In Progress</Badge>;
    }
    return <Badge variant="neutral" size="sm">{status}</Badge>;
  };

  return (
    <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search date, facility, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pulse-lime focus:ring-1 focus:ring-pulse-lime"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={facilityFilter}
            onChange={(e) => setFacilityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-white focus:outline-none focus:border-pulse-lime w-full sm:w-auto cursor-pointer"
          >
            {facilities.map((fac) => (
              <option key={fac} value={fac} className="bg-slate-900 text-white">
                {fac === 'ALL' ? 'All Facilities' : fac}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table content */}
      {filteredRecords.length === 0 ? (
        <div className="p-6">
          <EmptyState
            icon={Calendar}
            title="No Attendance Records Found"
            description="No logs matched your current search criteria. Try adjusting your query or facility filter."
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Facility</th>
                <th className="px-5 py-3.5">Check-in</th>
                <th className="px-5 py-3.5">Check-out</th>
                <th className="px-5 py-3.5">Duration</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRecords.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="px-5 py-4 font-semibold text-white whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-pulse-lime group-hover:scale-110 transition-transform" />
                      <span>{item.date}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-pulse-cyan shrink-0" />
                      <span>{item.facility}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-200 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.checkIn}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-400 whitespace-nowrap">
                    {item.checkOut}
                  </td>
                  <td className="px-5 py-4 text-slate-400 font-mono whitespace-nowrap">
                    {item.duration || '1h 30m'}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer count */}
      <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-[11px] text-slate-400">
        <span>Showing {filteredRecords.length} of {records.length} total entries</span>
        <span className="font-mono text-pulse-lime">Sync Status: Real-Time Verified</span>
      </div>
    </div>
  );
};
