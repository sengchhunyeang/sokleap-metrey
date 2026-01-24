'use client';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
  dark: 'btn-dark',
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${variants[variant]} ${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
