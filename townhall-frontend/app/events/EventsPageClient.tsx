'use client';

import { useState, useMemo } from 'react';
import { EventCard, Event } from '@/components/ui/EventCard';
import { SearchInput } from '@/components/ui/SearchInput';
import { TagFilter } from '@/components/ui/TagFilter';

interface EventsPageClientProps {
  events: Event[];
  allTags: string[];
}

export function EventsPageClient({ events, allTags }: EventsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<'all' | 'upcoming' | 'this-week' | 'this-month'>('all');

  // Filter events
  const filteredEvents = useMemo(() => {
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return events.filter((event) => {
      const eventDate = new Date(event.date);

      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => event.tags?.includes(tag));

      // Date filter
      let matchesDate = true;
      switch (dateFilter) {
        case 'upcoming':
          matchesDate = eventDate >= now;
          break;
        case 'this-week':
          matchesDate = eventDate >= now && eventDate <= oneWeekFromNow;
          break;
        case 'this-month':
          matchesDate = eventDate >= now && eventDate <= oneMonthFromNow;
          break;
        default:
          matchesDate = true;
      }

      return matchesSearch && matchesTags && matchesDate;
    });
  }, [events, searchQuery, selectedTags, dateFilter]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchInput
              placeholder="Search events..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="flex-1 max-w-md"
            />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
              className="px-4 py-3 border-2 border-black focus:outline-none focus:border-bauhaus-blue"
              aria-label="Filter by date"
            >
              <option value="all">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
          <TagFilter
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearTags}
          />
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
        </p>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 flex items-center justify-center">
              <span className="text-4xl">📅</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">No Events Found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
                setDateFilter('all');
              }}
              className="px-4 py-2 bg-bauhaus-blue text-white font-semibold uppercase tracking-wider hover:bg-blue-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
