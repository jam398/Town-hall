'use client';

import { useState, useMemo } from 'react';
import { BlogCard, BlogPost } from '@/components/ui/BlogCard';
import { SearchInput } from '@/components/ui/SearchInput';
import { TagFilter } from '@/components/ui/TagFilter';
import { Pagination } from '@/components/ui/Pagination';

interface BlogPageClientProps {
  posts: BlogPost[];
  allTags: string[];
}

const POSTS_PER_PAGE = 6;

export function BlogPageClient({ posts, allTags }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts based on search and tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const handleClearTags = () => {
    setSelectedTags([]);
    setCurrentPage(1);
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <SearchInput
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="max-w-md"
          />
          <TagFilter
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearTags}
          />
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
          {searchQuery && ` for "${searchQuery}"`}
          {selectedTags.length > 0 && ` in ${selectedTags.join(', ')}`}
        </p>

        {/* Blog Grid */}
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-12"
              />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">No Articles Found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
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
