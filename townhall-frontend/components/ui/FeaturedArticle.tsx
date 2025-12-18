import Link from 'next/link';
import { ArrowRight, Calendar, User, BookOpen } from 'lucide-react';
import { BlogPost } from '@/lib/api';

interface FeaturedArticleProps {
  post: BlogPost;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="grid lg:grid-cols-12 gap-0 bg-swiss-black overflow-hidden">
        {/* Image/Visual area */}
        <div className="lg:col-span-5 relative aspect-video lg:aspect-auto lg:min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
          {/* Decorative typography */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <span className="text-[120px] lg:text-[180px] font-bold text-white/5 leading-none select-none">
              AI
            </span>
          </div>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-swiss-red text-swiss-white text-caption font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="absolute top-0 right-0 w-px h-full bg-neutral-700 hidden lg:block" />
        </div>
        
        {/* Content area */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
          <div className="w-12 h-1 bg-swiss-red mb-6" />
          <p className="text-caption font-medium text-swiss-red mb-4 tracking-wide">
            FEATURED ARTICLE
          </p>
          <h2 className="text-h2 lg:text-h1 font-bold text-swiss-white mb-4 group-hover:text-swiss-red transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-body text-neutral-400 mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-6 text-body-sm text-neutral-500 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" aria-hidden="true" />
              <span>{typeof post.author === 'string' ? post.author : post.author?.name || 'Town Hall Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-swiss-white group-hover:text-swiss-red transition-colors">
            <span className="font-medium">Read Article</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </div>
        </div>
      </article>
    </Link>
  );
}
