'use client';

const variants = {
  success: 'badge-approved',
  pending: 'badge-pending',
  danger: 'badge-rejected',
  default: 'bg-[#F5F5FA] text-[#5E6366]',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
