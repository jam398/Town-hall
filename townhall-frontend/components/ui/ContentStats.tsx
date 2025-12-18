interface Stat {
  value: string | number;
  label: string;
}

interface ContentStatsProps {
  stats: Stat[];
  className?: string;
}

export function ContentStats({ stats, className = '' }: ContentStatsProps) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-px bg-swiss-border ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-swiss-white p-6 lg:p-8 text-center">
          <p className="text-h2 lg:text-h1 font-bold text-swiss-black mb-1">{stat.value}</p>
          <p className="text-body-sm text-swiss-gray">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
