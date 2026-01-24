'use client';

export default function Select({
  label,
  name,
  value,
  defaultValue,
  options = [],
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
      <select
        id={name}
        name={name}
        value={value}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className="form-input"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
