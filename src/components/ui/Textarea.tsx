import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && <label className="input-label">{label}</label>}
      <textarea
        ref={ref}
        rows={4}
        className={`input-field resize-none ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
        {...props}
      />
      {error && <p className="error-text">{error}</p>}
      {hint && !error && <p className="text-xs text-ink-400 mt-1">{hint}</p>}
    </div>
  )
);

Textarea.displayName = 'Textarea';
