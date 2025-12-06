import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card } from './Card';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
  tags?: string[];
  readTime?: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card
        variant="default"
        padding="none"
        interactive
        className="overflow-hidden h-full"
        data-testid="blog-card"
      >
        {/* Image */}
        {post.image ? (
          <div className="relative aspect-video overflow-hidden bg-gray-100">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Bauhaus overlay on hover */}
            <div className="absolute inset-0 bg-bauhaus-blue/0 group-hover:bg-bauhaus-blue/10 transition-colors" />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-bauhaus-blue to-bauhaus-red flex items-center justify-center">
            <div className="w-16 h-16 bg-bauhaus-yellow" />
          </div>
        )}

        <div className="p-6">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-semibold uppercase tracking-wider bg-bauhaus-yellow/20 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            className="text-xl font-bold text-gray-900 mb-2 group-hover:text-bauhaus-blue transition-colors line-clamp-2"
            data-testid="blog-title"
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={post.date} data-testid="blog-date">
                {formattedDate}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" aria-hidden="true" />
              <span data-testid="blog-author">{post.author}</span>
            </div>
            {post.readTime && (
              <span className="text-gray-400">{post.readTime}</span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-bauhaus-blue group-hover:text-bauhaus-red transition-colors">
              Read Article
            </span>
            <ArrowRight
              className="w-4 h-4 text-bauhaus-blue group-hover:text-bauhaus-red group-hover:translate-x-1 transition-all"
              aria-hidden="true"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
