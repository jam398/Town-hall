import { Metadata } from 'next';
import Link from 'next/link';
import { Play, Clock, Eye } from 'lucide-react';
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

// VlogCard component - Swiss Modern
function VlogCard({ vlog }: { vlog: Vlog }) {
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
      <article className="bg-swiss-white border border-swiss-border h-full flex flex-col hover:border-swiss-black transition-colors">
        <div className="relative aspect-video bg-swiss-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-swiss-white flex items-center justify-center group-hover:bg-swiss-red transition-colors">
              <Play className="w-8 h-8 text-swiss-black group-hover:text-swiss-white ml-1" fill="currentColor" />
            </div>
          </div>
          {vlog.duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-swiss-black text-swiss-white text-caption font-medium">
              {vlog.duration}
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-h3 font-semibold text-swiss-black mb-3 group-hover:text-swiss-red transition-colors line-clamp-2">
            {vlog.title}
          </h3>
          <p className="text-body-sm text-swiss-gray mb-4 line-clamp-2 flex-grow">
            {vlog.description}
          </p>
          <div className="flex items-center gap-4 text-body-sm text-swiss-gray">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-swiss-black" aria-hidden="true" />
              <span>{vlog.views?.toLocaleString() || 0} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-swiss-black" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Main page content - Swiss Modern
function VlogsPageContent({ vlogs }: { vlogs: Vlog[] }) {
  return (
    <div className="min-h-screen bg-swiss-white">
      {/* Hero - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-white border-b border-swiss-border">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h1 className="text-h1 font-bold text-swiss-black mb-6">
                Vlogs
              </h1>
              <p className="text-body-lg text-swiss-gray max-w-2xl">
                Workshop recordings, tutorials, and community stories. 
                Learn at your own pace, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vlogs Grid - Swiss Modern */}
      <section className="py-24 lg:py-32">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          {vlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vlogs.map((vlog) => (
                <VlogCard key={vlog.id} vlog={vlog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-swiss-light flex items-center justify-center">
                <Play className="w-12 h-12 text-swiss-gray" />
              </div>
              <h2 className="text-h2 font-bold text-swiss-black mb-2">No Videos Yet</h2>
              <p className="text-body text-swiss-gray mb-6">
                Check back soon for new content!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* YouTube CTA - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-black">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h1 font-bold text-swiss-white mb-4">
                Subscribe to Our Channel
              </h2>
              <p className="text-body-lg text-neutral-400 max-w-lg">
                Get notified when we post new workshops, tutorials, and community stories.
              </p>
            </div>
            <div className="lg:col-span-5">
              <a
                href="https://youtube.com/@townhallnewark"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-swiss-red text-swiss-white font-medium hover:bg-red-600 transition-colors"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Subscribe on YouTube
              </a>
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
