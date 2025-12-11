import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'accent-red' | 'accent-black';
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      interactive = false,
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'bg-swiss-white transition-all duration-200 rounded-swiss';

    const variants = {
      default: 'border border-swiss-border shadow-swiss',
      elevated: 'shadow-swiss-md hover:shadow-swiss-lg',
      outlined: 'border-2 border-swiss-black',
      'accent-red': 'border-l-4 border-l-swiss-red border border-swiss-border',
      'accent-black': 'border-l-4 border-l-swiss-black border border-swiss-border',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const interactiveStyles = interactive
      ? 'cursor-pointer hover:shadow-swiss-md hover:-translate-y-0.5'
      : '';

    return (
      <div
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          paddings[padding],
          interactiveStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components
export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={clsx(
        'text-h3 font-semibold text-swiss-black leading-snug',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={clsx('text-swiss-gray mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('text-swiss-black', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('mt-6 pt-4 border-t border-swiss-border', className)}
      {...props}
    >
      {children}
    </div>
  );
}
