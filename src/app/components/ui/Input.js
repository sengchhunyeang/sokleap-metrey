'use client';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  onChange,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && <span className="text-[#F4645B]">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className="form-input"
        {...props}
      />
    </div>
  );
}
