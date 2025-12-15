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
      <article
        className="bg-swiss-white border border-swiss-border h-full flex flex-col hover:border-swiss-black transition-colors"
        data-testid="blog-card"
      >
        {/* Image - Swiss Modern minimal */}
        {post.image ? (
          <div className="relative aspect-video overflow-hidden bg-swiss-light">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video bg-swiss-black flex items-center justify-center">
            <div className="w-12 h-1 bg-swiss-red" />
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-caption font-medium bg-swiss-light text-swiss-gray"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            className="text-h3 font-semibold text-swiss-black mb-3 group-hover:text-swiss-red transition-colors line-clamp-2"
            data-testid="blog-title"
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-body-sm text-swiss-gray mb-6 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-body-sm text-swiss-gray">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-swiss-black" aria-hidden="true" />
              <time dateTime={post.date} data-testid="blog-date">
                {formattedDate}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-swiss-black" aria-hidden="true" />
              <span data-testid="blog-author">{post.author}</span>
            </div>
            {post.readTime && (
              <span>{post.readTime}</span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-6 pt-4 border-t border-swiss-border flex items-center justify-between">
            <span className="text-body-sm font-medium text-swiss-black group-hover:text-swiss-red transition-colors">
              Read Article
            </span>
            <ArrowRight
              className="w-4 h-4 text-swiss-black group-hover:text-swiss-red group-hover:translate-x-1 transition-all"
              aria-hidden="true"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
