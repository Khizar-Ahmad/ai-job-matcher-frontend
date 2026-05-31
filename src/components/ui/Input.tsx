import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && <label className="input-label">{label}</label>}
      <input
        ref={ref}
        className={`input-field ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
        {...props}
      />
      {error && <p className="error-text">{error}</p>}
      {hint && !error && <p className="text-xs text-ink-400 mt-1">{hint}</p>}
    </div>
  )
);

Input.displayName = 'Input';
