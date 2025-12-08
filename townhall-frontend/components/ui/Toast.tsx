'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Toast types
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Toast Container
function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

// Individual Toast
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const { type, title, message, duration = 5000 } = toast;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const styles = {
    success: {
      container: 'border-l-4 border-l-green-500 bg-green-50',
      icon: 'text-green-500',
    },
    error: {
      container: 'border-l-4 border-l-bauhaus-red bg-red-50',
      icon: 'text-bauhaus-red',
    },
    warning: {
      container: 'border-l-4 border-l-bauhaus-yellow bg-yellow-50',
      icon: 'text-yellow-600',
    },
    info: {
      container: 'border-l-4 border-l-bauhaus-blue bg-blue-50',
      icon: 'text-bauhaus-blue',
    },
  };

  const Icon = icons[type];
  const style = styles[type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 border border-gray-200 shadow-lg',
        'animate-slide-up',
        style.container
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', style.icon)} aria-hidden="true" />
      
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900">{title}</p>
        {message && <p className="text-sm text-gray-600 mt-1">{message}</p>}
      </div>

      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4 text-gray-500" aria-hidden="true" />
      </button>
    </div>
  );
}

// Convenience functions for common toast types
export function toast(context: ToastContextType, options: Omit<Toast, 'id'>) {
  context.addToast(options);
}

export const toastHelpers = {
  success: (context: ToastContextType, title: string, message?: string) => {
    context.addToast({ type: 'success', title, message });
  },
  error: (context: ToastContextType, title: string, message?: string) => {
    context.addToast({ type: 'error', title, message });
  },
  warning: (context: ToastContextType, title: string, message?: string) => {
    context.addToast({ type: 'warning', title, message });
  },
  info: (context: ToastContextType, title: string, message?: string) => {
    context.addToast({ type: 'info', title, message });
  },
};
