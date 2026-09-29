import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-pulse-lime shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-pulse-amber shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-pulse-rose shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-pulse-cyan shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-pulse-lime/40 shadow-glow-lime';
      case 'warning':
        return 'border-amber-500/40';
      case 'error':
        return 'border-rose-500/40';
      default:
        return 'border-pulse-cyan/40 shadow-glow-cyan';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-slate-900/95 border ${getBorderColor(
              toast.type
            )} backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-up`}
          >
            {getToastIcon(toast.type)}
            <div className="flex-1 text-sm font-medium text-slate-100 pr-2">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
