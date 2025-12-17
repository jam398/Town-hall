import { Metadata } from 'next';
import { Play, ArrowRight } from 'lucide-react';
import { getVlogs, Vlog } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/constants';
import { FeaturedVlog } from '@/components/ui/FeaturedVlog';
import { ContentStats } from '@/components/ui/ContentStats';
import { AccentBar } from '@/components/ui/AccentBar';
import { VlogCard } from '@/components/ui/VlogCard';

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

// Generate stats for vlogs
function getVlogStats(vlogs: Vlog[]) {
  const totalViews = vlogs.reduce((sum, vlog) => sum + (vlog.views || 0), 0);
  const totalVideos = vlogs.length;
  
  return [
    { value: totalVideos, label: 'Videos' },
    { value: totalViews.toLocaleString(), label: 'Total Views' },
    { value: '100%', label: 'Free Content' },
    { value: 'Weekly', label: 'New Uploads' },
  ];
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
              <AccentBar color="red" size="md" className="mb-6" />
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
            <FeaturedVlog vlog={featuredVlog} />
          </div>
        )}
      </section>

      {/* Stats Bar */}
      {vlogs.length > 0 && (
        <section className="border-y border-swiss-border">
          <div className="max-w-swiss mx-auto">
            <ContentStats stats={getVlogStats(vlogs)} />
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
                  <AccentBar color="black" size="md" className="mb-6" />
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
              <AccentBar color="red" size="md" className="mb-6" />
              <h2 className="text-h1 lg:text-display font-bold text-swiss-white mb-6">
                Subscribe to Our Channel
              </h2>
              <p className="text-body-lg text-neutral-400 max-w-lg mb-8">
                Get notified when we post new workshops, tutorials, and community stories.
              </p>
              <a
                href={SITE_CONFIG.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-swiss-red text-swiss-white font-medium hover:bg-red-600 transition-colors group"
              >
                <Play className="w-5 h-5" fill="currentColor" aria-hidden="true" />
                Subscribe on YouTube
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
