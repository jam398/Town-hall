import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'accent-blue' | 'accent-red' | 'accent-yellow';
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
    const baseStyles = 'bg-white transition-all duration-300';

    const variants = {
      default: 'border border-gray-200',
      elevated: 'shadow-md hover:shadow-lg',
      outlined: 'border-2 border-black',
      'accent-blue': 'border-l-4 border-l-bauhaus-blue border border-gray-200',
      'accent-red': 'border-l-4 border-l-bauhaus-red border border-gray-200',
      'accent-yellow': 'border-l-4 border-l-bauhaus-yellow border border-gray-200',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const interactiveStyles = interactive
      ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1'
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
        'text-xl font-bold text-gray-900 leading-tight',
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
      className={clsx('text-gray-600 mt-1', className)}
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
    <div className={clsx('text-gray-700', className)} {...props}>
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
      className={clsx('mt-6 pt-4 border-t border-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  );
}
