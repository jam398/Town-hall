'use client';

import { cn } from '@/lib/utils';

export interface Stat {
  value: string | number;
  label: string;
}

export interface StatsBarProps {
  stats: Stat[];
  className?: string;
  variant?: 'light' | 'dark';
}

export function StatsBar({ stats, className, variant = 'dark' }: StatsBarProps) {
  const isDark = variant === 'dark';
  
  return (
    <div 
      className={cn(
        'grid gap-px',
        isDark ? 'bg-swiss-black' : 'bg-swiss-border',
        className
      )}
      style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
    >
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={cn(
            'p-6 lg:p-8 text-center',
            isDark ? 'bg-swiss-black' : 'bg-swiss-white'
          )}
        >
          <p className={cn(
            'text-h2 lg:text-h1 font-bold mb-1',
            isDark ? 'text-swiss-white' : 'text-swiss-black'
          )}>
            {stat.value}
          </p>
          <p className={cn(
            'text-body-sm',
            isDark ? 'text-neutral-400' : 'text-swiss-gray'
          )}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
