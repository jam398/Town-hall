import Link from 'next/link';
import { Play, Clock, Eye, ArrowRight } from 'lucide-react';
import { Vlog } from '@/lib/api';

interface FeaturedVlogProps {
  vlog: Vlog;
}

export function FeaturedVlog({ vlog }: FeaturedVlogProps) {
  const formattedDate = new Date(vlog.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      href={`https://youtube.com/watch?v=${vlog.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      data-testid="featured-vlog-card"
    >
      <article className="grid lg:grid-cols-12 gap-0 bg-swiss-black overflow-hidden">
        {/* Video thumbnail area */}
        <div className="lg:col-span-7 relative aspect-video lg:aspect-auto lg:min-h-[400px]">
          {/* YouTube thumbnail */}
          {vlog.thumbnail && (
            <img
              src={vlog.thumbnail}
              alt={vlog.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/30 to-neutral-800/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-swiss-white flex items-center justify-center group-hover:bg-swiss-red transition-all duration-300 group-hover:scale-110">
              <Play className="w-10 h-10 lg:w-12 lg:h-12 text-swiss-black group-hover:text-swiss-white ml-1" fill="currentColor" aria-hidden="true" />
            </div>
          </div>
          {vlog.duration && (
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-swiss-red text-swiss-white text-body-sm font-medium">
              {vlog.duration}
            </div>
          )}
          {/* Decorative grid lines */}
          <div className="absolute top-0 right-0 w-px h-full bg-neutral-700 hidden lg:block" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-neutral-700 lg:hidden" />
        </div>
        
        {/* Content area */}
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
          <div className="w-12 h-1 bg-swiss-red mb-6" />
          <p className="text-caption font-medium text-swiss-red mb-4 tracking-wide">
            FEATURED VIDEO
          </p>
          <h2 className="text-h2 lg:text-h1 font-bold text-swiss-white mb-4 group-hover:text-swiss-red transition-colors">
            {vlog.title}
          </h2>
          <p className="text-body text-neutral-400 mb-6 line-clamp-3">
            {vlog.description}
          </p>
          <div className="flex items-center gap-6 text-body-sm text-neutral-500 mb-8">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>{vlog.viewCount?.toLocaleString() || 0} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-swiss-white group-hover:text-swiss-red transition-colors">
            <span className="font-medium">Watch Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </div>
        </div>
      </article>
    </Link>
  );
}
