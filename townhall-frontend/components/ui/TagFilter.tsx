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
                ? 'bg-bauhaus-blue text-white border-bauhaus-blue'
                : 'bg-white text-gray-700 border-gray-300 hover:border-bauhaus-blue'
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
