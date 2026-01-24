'use client';

const variants = {
  success: {
    bg: 'bg-[#32936F]/10',
    border: 'border-[#32936F]',
    title: 'text-[#32936F]',
  },
  error: {
    bg: 'bg-[#F4645B]/10',
    border: 'border-[#F4645B]',
    title: 'text-[#F4645B]',
  },
  warning: {
    bg: 'bg-[#F0A20B]/10',
    border: 'border-[#F0A20B]',
    title: 'text-[#F0A20B]',
  },
  info: {
    bg: 'bg-[#677FD2]/10',
    border: 'border-[#677FD2]',
    title: 'text-[#677FD2]',
  },
};

export default function Alert({ variant = 'info', title, children, className = '' }) {
  const styles = variants[variant];

  return (
    <div className={`p-4 rounded border ${styles.bg} ${styles.border} ${className}`}>
      {title && (
        <p className={`text-[14px] font-semibold ${styles.title} mb-1`}>{title}</p>
      )}
      <div className="text-[12px] text-[#5E6366]">{children}</div>
    </div>
  );
}
