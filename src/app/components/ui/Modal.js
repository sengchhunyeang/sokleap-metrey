'use client';

export default function Modal({ isOpen, onClose, title, children, className = '' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative bg-[#FEFEFE] rounded-lg shadow-lg w-full max-w-md mx-4 z-10 ${className}`}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#ABAFB1]">
          <h3 className="text-[16px] font-bold text-[#050505]">{title}</h3>
          <button
            onClick={onClose}
            className="text-[#5E6366] hover:text-[#050505] text-[20px]"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.Footer = function ModalFooter({ children, className = '' }) {
  return (
    <div className={`flex justify-end gap-2 pt-4 border-t border-[#ABAFB1] mt-4 ${className}`}>
      {children}
    </div>
  );
};
