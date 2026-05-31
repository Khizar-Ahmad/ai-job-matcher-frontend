import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption { value: string; label: string }

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && <label className="input-label">{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={`input-field appearance-none pr-10 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface-card">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  )
);

Select.displayName = 'Select';
