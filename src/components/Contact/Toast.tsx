'use client';

import { useEffect, useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';

export interface ToastMessage {
  type: 'success' | 'error';
  message: string;
}

interface ToastProps extends ToastMessage {
  onClose: () => void;
}

const AUTO_DISMISS_MS = 4000;

export function Toast({ type, message, onClose }: ToastProps) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsShown(true));
    const timer = setTimeout(onClose, AUTO_DISMISS_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [onClose]);

  const Icon = type === 'success' ? FiCheckCircle : FiAlertCircle;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-6 right-6 z-50 flex items-start sm:left-auto sm:max-w-sm gap-3 rounded-2xl border bg-surface px-4 py-3 text-sm text-ink shadow-lg transition duration-300 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        type === 'success' ? 'border-accent/40' : 'border-red-500/50'
      } ${isShown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      <Icon aria-hidden className={`mt-0.5 shrink-0 ${type === 'success' ? 'text-accent' : 'text-red-500'}`} />
      <p className="leading-5">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="-mr-1 shrink-0 rounded-full p-1 text-muted transition hover:text-ink"
      >
        <FiX aria-hidden />
      </button>
    </div>
  );
}
