'use client';

import { cn } from '@/lib/utils';

export interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export function TagFilter({
  tags,
  selectedTags,
  onTagToggle,
  onClearAll,
  className,
}: TagFilterProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {selectedTags.length > 0 && onClearAll && (
        <button
          onClick={onClearAll}
          className="px-3 py-1 text-sm font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear All
        </button>
      )}
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={cn(
              'px-3 py-1 text-sm font-semibold uppercase tracking-wider border-2 transition-colors',
              isSelected
                ? 'bg-swiss-black text-swiss-white border-swiss-black'
                : 'bg-swiss-white text-swiss-gray border-swiss-border hover:border-swiss-black'
            )}
            aria-pressed={isSelected}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
