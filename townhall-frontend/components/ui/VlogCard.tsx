import Link from 'next/link';
import { Play, Eye } from 'lucide-react';
import { Vlog } from '@/lib/api';

interface VlogCardProps {
  vlog: Vlog;
  index: number;
}

export function VlogCard({ vlog, index }: VlogCardProps) {
  const formattedDate = new Date(vlog.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      href={`https://youtube.com/watch?v=${vlog.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      data-testid="vlog-card"
    >
      <article className="bg-swiss-white border border-swiss-border h-full flex flex-col hover:border-swiss-black hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Video thumbnail with number overlay */}
        <div className="relative aspect-video bg-swiss-black overflow-hidden">
          {/* YouTube thumbnail */}
          {vlog.thumbnail && (
            <img
              src={vlog.thumbnail}
              alt={vlog.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/20 to-neutral-900/20" />
          
          {/* Episode number - Swiss Modern typographic element */}
          <div className="absolute top-0 left-0 p-4">
            <span className="text-display font-bold text-white/10 leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-swiss-white flex items-center justify-center group-hover:bg-swiss-red transition-all duration-300 group-hover:scale-110">
              <Play className="w-7 h-7 text-swiss-black group-hover:text-swiss-white ml-0.5" fill="currentColor" aria-hidden="true" />
            </div>
          </div>
          
          {/* Duration badge */}
          {vlog.duration && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-swiss-black/90 text-swiss-white text-caption font-medium backdrop-blur-sm">
              {vlog.duration}
            </div>
          )}
          
          {/* Red accent line on hover */}
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-swiss-red group-hover:w-full transition-all duration-300" />
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-h3 font-semibold text-swiss-black mb-3 group-hover:text-swiss-red transition-colors line-clamp-2">
            {vlog.title}
          </h3>
          <p className="text-body-sm text-swiss-gray mb-4 line-clamp-2 flex-grow">
            {vlog.description}
          </p>
          <div className="flex items-center justify-between text-body-sm text-swiss-gray pt-4 border-t border-swiss-border">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-swiss-black" aria-hidden="true" />
              <span>{vlog.viewCount?.toLocaleString() || 0} views</span>
            </div>
            <span>{formattedDate}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
