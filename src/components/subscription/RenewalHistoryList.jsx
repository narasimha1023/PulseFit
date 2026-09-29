import React from 'react';
import { Badge } from '../common/Badge';
import { Calendar, Receipt, Download, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const RenewalHistoryList = ({ history = [] }) => {
  const { showToast } = useToast();

  const handleDownloadInvoice = (invoiceNo) => {
    showToast(`Downloading receipt for ${invoiceNo}...`, 'info');
  };

  return (
    <div className="glass-card rounded-2xl border border-slate-800 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-pulse-lime" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Renewal History & Billing
          </h3>
        </div>
        <span className="text-xs text-slate-400">All transactions verified</span>
      </div>

      <div className="divide-y divide-slate-800/80">
        {history.map((item) => (
          <div
            key={item.id}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30 px-3 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-pulse-lime shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    {item.date} — {item.plan}
                  </span>
                  <Badge variant="emerald" size="xs">
                    {item.status || 'Renewed'}
                  </Badge>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Invoice: {item.invoiceNo || 'PF-INV-2026'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 ml-13 sm:ml-0">
              <span className="text-sm font-bold text-white">{item.amount}</span>
              <button
                onClick={() => handleDownloadInvoice(item.invoiceNo)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                title="Download Tax Receipt"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
