import { Metadata } from 'next';
import Link from 'next/link';
import { Play, Clock, Eye, ArrowRight } from 'lucide-react';
import { getVlogs, Vlog } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Vlogs',
  description: 'Video content from Town Hall Newark. Watch workshop recordings, tutorials, and community stories.',
};

// Fetch vlogs from backend API
async function fetchVlogs(): Promise<Vlog[]> {
  try {
    const apiVlogs = await getVlogs();
    return apiVlogs;
  } catch (error) {
    console.error('Error fetching vlogs:', error);
    return [];
  }
}

// Featured VlogCard - Large format for hero
function FeaturedVlogCard({ vlog }: { vlog: Vlog }) {
  const formattedDate = new Date(vlog.date).toLocaleDateString('en-US', {
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
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-swiss-white flex items-center justify-center group-hover:bg-swiss-red transition-all duration-300 group-hover:scale-110">
              <Play className="w-10 h-10 lg:w-12 lg:h-12 text-swiss-black group-hover:text-swiss-white ml-1" fill="currentColor" />
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
              <span>{vlog.views?.toLocaleString() || 0} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-swiss-white group-hover:text-swiss-red transition-colors">
            <span className="font-medium">Watch Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}

// VlogCard component - Swiss Modern with enhanced visuals
function VlogCard({ vlog, index }: { vlog: Vlog; index: number }) {
  const formattedDate = new Date(vlog.date).toLocaleDateString('en-US', {
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
      <article className="bg-swiss-white border border-swiss-border h-full flex flex-col hover:border-swiss-black transition-all duration-300 hover:-translate-y-1">
        {/* Video thumbnail with number overlay */}
        <div className="relative aspect-video bg-swiss-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
          
          {/* Episode number - Swiss Modern typographic element */}
          <div className="absolute top-0 left-0 p-4">
            <span className="text-display font-bold text-white/10 leading-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-swiss-white flex items-center justify-center group-hover:bg-swiss-red transition-all duration-300 group-hover:scale-110">
              <Play className="w-7 h-7 text-swiss-black group-hover:text-swiss-white ml-0.5" fill="currentColor" />
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
              <span>{vlog.views?.toLocaleString() || 0}</span>
            </div>
            <span>{formattedDate}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Stats component - Swiss Modern bold typography
function VlogStats({ vlogs }: { vlogs: Vlog[] }) {
  const totalViews = vlogs.reduce((sum, vlog) => sum + (vlog.views || 0), 0);
  const totalVideos = vlogs.length;
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-swiss-border">
      {[
        { value: totalVideos, label: 'Videos' },
        { value: totalViews.toLocaleString(), label: 'Total Views' },
        { value: '100%', label: 'Free Content' },
        { value: 'Weekly', label: 'New Uploads' },
      ].map((stat, index) => (
        <div key={index} className="bg-swiss-white p-6 lg:p-8 text-center">
          <p className="text-h2 lg:text-h1 font-bold text-swiss-black mb-1">{stat.value}</p>
          <p className="text-body-sm text-swiss-gray">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

// Main page content - Swiss Modern with visual enhancements
function VlogsPageContent({ vlogs }: { vlogs: Vlog[] }) {
  const featuredVlog = vlogs[0];
  const remainingVlogs = vlogs.slice(1);

  return (
    <div className="min-h-screen bg-swiss-white">
      {/* Hero with Featured Video - Swiss Modern */}
      <section className="bg-swiss-white">
        <div className="max-w-swiss mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-6">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h1 className="text-display font-bold text-swiss-black mb-6">
                Vlogs
              </h1>
            </div>
            <div className="lg:col-span-6 flex items-end">
              <p className="text-body-lg text-swiss-gray">
                Workshop recordings, tutorials, and community stories. 
                Learn at your own pace, anytime.
              </p>
            </div>
          </div>
        </div>
        
        {/* Featured Video */}
        {featuredVlog && (
          <div className="max-w-swiss mx-auto px-6 lg:px-8 pb-16 lg:pb-24">
            <FeaturedVlogCard vlog={featuredVlog} />
          </div>
        )}
      </section>

      {/* Stats Bar */}
      {vlogs.length > 0 && (
        <section className="border-y border-swiss-border">
          <div className="max-w-swiss mx-auto">
            <VlogStats vlogs={vlogs} />
          </div>
        </section>
      )}

      {/* Vlogs Grid - Swiss Modern */}
      <section className="py-24 lg:py-32">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          {remainingVlogs.length > 0 ? (
            <>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="w-12 h-1 bg-swiss-black mb-6" />
                  <h2 className="text-h2 font-bold text-swiss-black">
                    All Videos
                  </h2>
                </div>
                <p className="text-body text-swiss-gray">
                  {remainingVlogs.length} video{remainingVlogs.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingVlogs.map((vlog, index) => (
                  <VlogCard key={vlog.id} vlog={vlog} index={index + 1} />
                ))}
              </div>
            </>
          ) : vlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-swiss-light flex items-center justify-center">
                <Play className="w-12 h-12 text-swiss-gray" />
              </div>
              <h2 className="text-h2 font-bold text-swiss-black mb-2">No Videos Yet</h2>
              <p className="text-body text-swiss-gray mb-6">
                Check back soon for new content!
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* YouTube CTA - Swiss Modern with visual enhancement */}
      <section className="relative py-24 lg:py-32 bg-swiss-black overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neutral-800/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-neutral-700/30" style={{ transform: 'translate(-50%, 50%)' }} />
        
        <div className="max-w-swiss mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h1 lg:text-display font-bold text-swiss-white mb-6">
                Subscribe to Our Channel
              </h2>
              <p className="text-body-lg text-neutral-400 max-w-lg mb-8">
                Get notified when we post new workshops, tutorials, and community stories.
              </p>
              <a
                href="https://youtube.com/@townhallnewark"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-swiss-red text-swiss-white font-medium hover:bg-red-600 transition-colors group"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Subscribe on YouTube
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="lg:col-span-5 hidden lg:flex justify-end">
              {/* Large decorative play icon */}
              <div className="w-48 h-48 border-2 border-neutral-700 flex items-center justify-center">
                <Play className="w-20 h-20 text-neutral-700" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function VlogsPage() {
  const vlogs = await fetchVlogs();
  return <VlogsPageContent vlogs={vlogs} />;
}
