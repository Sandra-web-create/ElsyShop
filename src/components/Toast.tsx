import React from 'react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#4A3027] text-[#FFFEFA] shadow-xl border border-[#806451] text-xs font-medium">
        <span>{message}</span>
        <button
          onClick={onDismiss}
          className="text-[#E8DCCB] hover:text-white ml-1 font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
