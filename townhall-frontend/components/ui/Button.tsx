import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'outline-inverted' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
}

const baseStyles = `
  inline-flex items-center justify-center
  font-medium tracking-wide
  transition-all duration-200
  rounded-swiss
  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const variants = {
  primary: `
    bg-swiss-black text-swiss-white
    hover:bg-neutral-800
    focus-visible:ring-swiss-black
    active:transform active:scale-[0.98]
  `,
  secondary: `
    bg-swiss-red text-swiss-white
    hover:bg-red-600
    focus-visible:ring-swiss-red
    active:transform active:scale-[0.98]
  `,
  accent: `
    bg-swiss-red text-swiss-white
    hover:bg-red-600
    focus-visible:ring-swiss-red
    active:transform active:scale-[0.98]
    uppercase tracking-wider font-semibold
  `,
  outline: `
    bg-transparent text-swiss-black
    border-2 border-swiss-black
    hover:bg-swiss-black hover:text-swiss-white
    focus-visible:ring-swiss-black
  `,
  'outline-inverted': `
    bg-transparent text-swiss-white
    border-2 border-swiss-white
    hover:bg-swiss-white hover:text-swiss-black
    focus-visible:ring-swiss-white
  `,
  ghost: `
    bg-transparent text-swiss-black
    hover:bg-swiss-light
    focus-visible:ring-swiss-gray
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
};

function LoadingSpinner() {
  return (
    <>
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Loading...
    </>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      href,
      external,
      ...props
    },
    ref
  ) => {
    const combinedClassName = clsx(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    const content = isLoading ? <LoadingSpinner /> : children;

    // Render as link if href is provided
    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {content}
        </Link>
      );
    }

    // Render as button
    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
