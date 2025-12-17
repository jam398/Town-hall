import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogCard } from '@/components/ui/BlogCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { AccentBar } from '@/components/ui/AccentBar';
import { getBlogPosts, BlogPost } from '@/lib/api';

function BlogSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-swiss-light h-48 mb-4" />
          <div className="h-4 bg-swiss-light w-3/4 mb-2" />
          <div className="h-4 bg-swiss-light w-1/2" />
        </div>
      ))}
    </div>
  );
}

async function BlogList() {
  let posts: BlogPost[] = [];
  
  try {
    const allPosts = await getBlogPosts();
    posts = allPosts.slice(0, 3);
  } catch {
    // Fallback to empty
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        variant="posts"
        actionLabel="View All Articles"
        actionHref="/blog"
      />
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

export function BlogSection() {
  return (
    <section className="py-24 lg:py-32 bg-swiss-light">
      <div className="max-w-swiss mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <AccentBar color="black" size="md" className="mb-6" />
            <h2 className="text-h1 font-bold text-swiss-black">
              Latest Articles
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end lg:items-end">
            <Link 
              href="/blog" 
              className="group inline-flex items-center gap-2 text-swiss-black font-medium hover:text-swiss-red transition-colors"
            >
              View All Posts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <Suspense fallback={<BlogSkeleton />}>
          <BlogList />
        </Suspense>
      </div>
    </section>
  );
}
