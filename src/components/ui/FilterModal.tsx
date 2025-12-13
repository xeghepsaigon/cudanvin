'use client';

import { X } from 'lucide-react';

interface FilterModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const FilterModal: React.FC<FilterModalProps> = ({ title, onClose, children }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
        <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-semibold text-[#1F2937]">{title}</h2>
            <button
              onClick={onClose}
              className="text-[#6B7280] hover:text-[#1F2937] p-2 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
