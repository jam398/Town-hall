interface AccentBarProps {
  color?: 'red' | 'black';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorClasses = {
  red: 'bg-swiss-red',
  black: 'bg-swiss-black',
};

const sizeClasses = {
  sm: 'w-8 h-0.5',
  md: 'w-12 h-1',
  lg: 'w-16 h-1',
};

export function AccentBar({ 
  color = 'red', 
  size = 'md',
  className = '' 
}: AccentBarProps) {
  return (
    <div 
      className={`${colorClasses[color]} ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
