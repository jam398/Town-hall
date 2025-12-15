import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-swiss-black mb-2"
          >
            {label}
            {props.required && (
              <span className="text-swiss-red ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-4 py-3 min-h-[48px]',
            'text-body text-swiss-black',
            'bg-swiss-white border border-swiss-border',
            'transition-all duration-200',
            'placeholder:text-swiss-gray',
            'focus:outline-none focus:ring-0 focus:border-swiss-red',
            error
              ? 'border-swiss-error focus:border-swiss-error'
              : 'border-swiss-border',
            'disabled:bg-swiss-light disabled:text-swiss-gray disabled:cursor-not-allowed',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-body-sm text-swiss-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-body-sm text-swiss-gray"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea variant
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-swiss-black mb-2"
          >
            {label}
            {props.required && (
              <span className="text-swiss-red ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-4 py-3 min-h-[120px]',
            'text-body text-swiss-black',
            'bg-swiss-white border border-swiss-border',
            'transition-all duration-200',
            'placeholder:text-swiss-gray',
            'focus:outline-none focus:ring-0 focus:border-swiss-red',
            'resize-y',
            error
              ? 'border-swiss-error focus:border-swiss-error'
              : 'border-swiss-border',
            'disabled:bg-swiss-light disabled:text-swiss-gray disabled:cursor-not-allowed',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-body-sm text-swiss-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-body-sm text-swiss-gray"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Select variant
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, options, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-swiss-black mb-2"
          >
            {label}
            {props.required && (
              <span className="text-swiss-red ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full px-4 py-3 min-h-[48px]',
            'text-body text-swiss-black',
            'bg-swiss-white border border-swiss-border',
            'transition-all duration-200',
            'focus:outline-none focus:ring-0 focus:border-swiss-red',
            'appearance-none cursor-pointer',
            'bg-no-repeat bg-right',
            error
              ? 'border-swiss-error focus:border-swiss-error'
              : 'border-swiss-border',
            'disabled:bg-swiss-light disabled:text-swiss-gray disabled:cursor-not-allowed',
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23000' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
            backgroundPosition: 'right 1rem center',
          }}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-body-sm text-swiss-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-body-sm text-swiss-gray"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
